import { action, makeObservable, observable } from 'mobx'
import {
    IDataAllEmployeeFollowUp,
    IDataFollowUp,
} from '../data_definitions/FollowUpDefinitions'
import { IPersistenceProvider } from '../persistence/IPersistenceProvider'
import { IWriteable } from '../persistence/IWriteable'
import { Id } from '../util/Id'
import { FollowUp } from '../value_objects/FollowUp'
import { IStore } from './IStore'

export class FollowUpStore implements IStore, IWriteable {
    // keyed by id
    _followUps: Map<string, FollowUp[]>
    private _currentUser: Id
    _persistenceProvider: IPersistenceProvider

    constructor() {
        makeObservable(this, {
            _followUps: observable,
            resolve: action,
        })
        this._followUps = observable.map()
        this._currentUser = null
        this._persistenceProvider = null
    }

    public get persistenceProvider(): IPersistenceProvider {
        return this._persistenceProvider
    }
    public set persistenceProvider(value: IPersistenceProvider) {
        this._persistenceProvider = value
    }
    public get currentUser(): Id {
        return this._currentUser
    }
    public set currentUser(value: Id) {
        this._currentUser = value
    }
    get unresolvedFollowups(): FollowUp[] {
        if (!this.currentUser)
            throw new Error('Current user unset in FollowUpStore')

        const userIdStr = Id.asString(this._currentUser)
        return this._followUps
            .get(userIdStr)
            .filter((followUp) => followUp.resolvedDate === null)
    }

    resolve(followUpId: string): void {
        if (!this.currentUser)
            throw new Error('Current user unset in FollowUpStore')

        const userIdStr = Id.asString(this._currentUser)
        this._followUps
            .get(userIdStr)
            .filter(
                (followUp) => followUp.id.id === followUpId
            )[0].resolvedDate = new Date()

        this._followUps.set(userIdStr, [...this._followUps.get(userIdStr)])
    }

    load(): void {
        const followUpJsonData = this._persistenceProvider.getFollowUpData()

        for (const employeeId in followUpJsonData) {
            const employeeFollowUps = []
            for (const employeeJson of followUpJsonData[employeeId]) {
                employeeFollowUps.push(FollowUp.fromJSON(employeeJson))
            }

            this._followUps.set(employeeId, employeeFollowUps)
        }
    }

    write(): Promise<string> {
        if (this._persistenceProvider === null)
            throw new Error('peristenceProvider null in Followup store')

        let followUpData: IDataAllEmployeeFollowUp = {}

        for (const [employeeId, followUps] of this._followUps) {
            const jsonFollowUps: IDataFollowUp[] = []
            for (const followUp of followUps) {
                jsonFollowUps.push(followUp.serialize())
            }
            followUpData[employeeId] = jsonFollowUps
        }
        return this._persistenceProvider.writeFollowUpData(followUpData)
    }
}
