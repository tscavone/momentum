// The store that contains the selected employee at the global level
//
import { makeAutoObservable } from 'mobx'
import { ISelectedEmployeeData } from '../data_definitions/SelectedEmployeeDefinitions'
import { Id } from '../util/Id'
import { IStore } from './IStore'

export class SelectedEmployeeStore implements IStore {
    //
    //members
    //
    private _selectedId: Id

    //dumping this here for debugging purposes
    public _currentDate: Date

    //
    //constructor
    //
    constructor() {
        this._selectedId = new Id()
        this._currentDate = new Date()

        makeAutoObservable(this)
    }

    set selectedId(newId: string) {
        console.log('old selected user value: ', this._selectedId)
        let newIdObj = new Id()
        newIdObj.id = newId
        this._selectedId = newIdObj
        console.log('new value: ', this._selectedId)
    }

    get selectedId(): string {
        return this._selectedId.id
    }

    //
    //public methods
    //
    loadEmployee(jsonObj: ISelectedEmployeeData, employeeId?: Id): void {
        //the loaded data itself is a selected employee id, so there shouldn't be a passed one
        if (employeeId)
            throw "Settings Store doesn't use employeeId so this was most likely called in error"

        let id = new Id()
        id.id = jsonObj._selectedId
        this._selectedId = id
    }
}
