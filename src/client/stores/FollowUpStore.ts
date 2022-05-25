import { IPersistenceProvider } from '../persistence/IPersistenceProvider'
import { IWriteable } from '../persistence/IWriteable'
import { FollowUp } from '../value_objects/FollowUp'
import { IStore } from './IStore'

export class FollowUpStore implements IStore, IWriteable {
    // keyed by id
    private _followUps: Map<string, FollowUp>
    _persistenceProvider: IPersistenceProvider

    constructor() {
        this._followUps = new Map<string, FollowUp>()
        this._persistenceProvider = null
    }

    public get persistenceProvider(): IPersistenceProvider {
        return this._persistenceProvider
    }
    public set persistenceProvider(value: IPersistenceProvider) {
        this._persistenceProvider = value
    }

    load(): void {
        const followUpJsonData = this._persistenceProvider.getFollowUpData()

        this._followUps.clear()

        for (const followUp in followUpJsonData) {
            const followUp = FollowUp.fromJSON()
        }
    }
    write(): Promise<string> {
        throw new Error('Method not implemented.')
    }
}
