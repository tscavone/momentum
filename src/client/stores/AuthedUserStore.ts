// The store that contains the selected employee at the global level
//
import { makeAutoObservable } from 'mobx'
import { IAuthedUserData } from '../data_definitions/AuthedUserDefinitions'
import { Id } from '../util/Id'
import { IStore } from './IStore'

export class AuthedUserStore implements IStore {
    //
    //members
    //
    private _userId: Id
    private _token: string

    //
    //constructor
    //
    constructor() {
        this._userId = null
        this._token = null

        makeAutoObservable(this)
    }

    public get userId(): Id {
        return this._userId
    }
    public set userId(value: Id) {
        this._userId = value
    }
    public get token(): string {
        return this._token
    }
    public set token(value: string) {
        this._token = value
    }

    //
    //public methods
    //
    load(jsonObj: IAuthedUserData, employeeId?: Id): void {
        //the loaded data itself is a selected employee id, so there shouldn't be a passed one
        if (employeeId)
            throw "AuthedUserStore doesn't use employeeId so this was most likely called in error"

        let id = new Id()
        id.id = jsonObj._userId
        this._userId = id
        this._token = jsonObj._token
    }
}
