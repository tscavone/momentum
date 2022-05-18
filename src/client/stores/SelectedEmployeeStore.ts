// The store that contains the selected employee at the global level
//
import { makeAutoObservable } from 'mobx'
import { IPersistenceProvider } from '../persistence/IPersistenceProvider'
import { IWriteable } from '../persistence/IWriteable'
import { Id } from '../util/Id'
import { IStore } from './IStore'

export class SelectedEmployeeStore implements IStore, IWriteable {
    //
    //members
    //
    private _selectedId: Id
    _persistenceProvider: IPersistenceProvider

    //
    //constructor
    //
    constructor() {
        makeAutoObservable(this)
        this._selectedId = new Id()
        this._persistenceProvider = null
    }

    public get persistenceProvider(): IPersistenceProvider {
        return this._persistenceProvider
    }
    public set persistenceProvider(value: IPersistenceProvider) {
        this._persistenceProvider = value
    }

    set selectedId(newId: string) {
        let newIdObj = Id.fromString(newId)
        this._selectedId = newIdObj
    }

    get selectedId(): string {
        return this._selectedId.id
    }

    //
    //public methods
    //
    load(): void {
        const selectedJsonData =
            this._persistenceProvider.getSelectedEmployeeData()

        this._selectedId = Id.fromString(selectedJsonData._selectedId)
    }

    write(): Promise<string> {
        if (this._persistenceProvider === null)
            throw new Error('peristenceProvider null in SelectedEmployeeStore')

        return this._persistenceProvider.writeSelectedEmployeeData({
            _selectedId: this._selectedId.id,
        })
    }
}
