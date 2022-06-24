import { action, makeObservable, observable } from 'mobx'
import {
    IDataAllEmployeeFollowUp,
    IDataFollowUp,
} from '../../shared/data_definitions/FollowUpDefinitions'
import { IPersistenceProvider } from '../persistence/IPersistenceProvider'
import { IWriteable } from '../persistence/IWriteable'
import { Id } from '../util/Id'
import { FollowUp } from '../value_objects/FollowUp'
import { IStore } from './IStore'

export class FollowUpStore implements IStore, IWriteable {
    // keyed by id
    _followUps: Map<string, FollowUp[]>
    private _currentEmployee: Id
    _persistenceProvider: IPersistenceProvider

    constructor() {
        makeObservable(this, {
            _followUps: observable,
            resolve: action,
        })
        this._followUps = observable.map()
        this._currentEmployee = null
        this._persistenceProvider = null
    }

    public get persistenceProvider(): IPersistenceProvider {
        return this._persistenceProvider
    }
    public set persistenceProvider(value: IPersistenceProvider) {
        this._persistenceProvider = value
    }

    //we need to set this because unresolvedFollowups needs to be a getter for mobx and they can't take parameters
    public get currentEmployee(): Id {
        return this._currentEmployee
    }
    public set currentEmployee(value: Id) {
        this._currentEmployee = value
    }
    get unresolvedFollowups(): FollowUp[] {
        if (!this.currentEmployee)
            throw new Error('Current user unset in FollowUpStore')

        const userIdStr = Id.asString(this._currentEmployee)
        return this._followUps
            .get(userIdStr)
            .filter((followUp) => followUp.resolvedDate === null)
    }

    //if currentEmployee is unspecified, then it is global and the followup is added to all employees
    add(text: string, currentEmployee?: string): Promise<string> {
        let followUp = new FollowUp()
        followUp.text = text

        if (currentEmployee) {
            this._followUps.get(currentEmployee).push(followUp)
        } else {
            for (const employeeId of this._followUps.keys()) {
                this._followUps.get(employeeId).push(followUp)
                followUp = new FollowUp()
                followUp.text = text
            }
        }

        return this.write()
    }

    resolve(followUpId: string): void {
        if (!this.currentEmployee)
            throw new Error('Current user unset in FollowUpStore')

        const userIdStr = Id.asString(this._currentEmployee)
        this._followUps
            .get(userIdStr)
            .filter(
                (followUp) => followUp.id.id === followUpId
            )[0].resolvedDate = new Date()

        this._followUps.set(userIdStr, [...this._followUps.get(userIdStr)])
    }

    async load(): Promise<string> {
        const followUpJsonData =
            (await this._persistenceProvider.getFollowUpData()) as IDataAllEmployeeFollowUp

        for (const employeeId in followUpJsonData) {
            const employeeFollowUps = []
            for (const employeeJson of followUpJsonData[employeeId]) {
                employeeFollowUps.push(FollowUp.fromJSON(employeeJson))
            }

            this._followUps.set(employeeId, employeeFollowUps)
        }

        return Promise.resolve('followups loaded')
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
