// The store that contains the selected employee at the global level
//
import { makeAutoObservable } from 'mobx'
import { Id } from '../util/Id'
import { IStore } from './IStore'

export class SelectedEmployeeStore implements IStore {
    //
    //members
    //
    private _selectedId: Id

    //
    //constructor
    //
    constructor() {
        this._selectedId = new Id()

        makeAutoObservable(this)
    }

    set selectedId(newId: string) {
        let newIdObj = new Id()
        newIdObj.id = newId
        this._selectedId = newIdObj
    }

    get selectedId(): string {
        return this._selectedId.id
    }

    //
    //public methods
    //
    load(jsonObj: { _selectedId: string }): void {
        let id = new Id()
        id.id = jsonObj._selectedId
        this._selectedId = id
    }
}
