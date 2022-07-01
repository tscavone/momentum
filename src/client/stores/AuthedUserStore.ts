// The store that contains the selected employee at the global level
//
import { makeAutoObservable } from 'mobx'
import { IDataAuthedUser } from '../../shared/data_definitions/AuthedUserDefinitions'
import { Id } from '../util/Id'
import { IStore } from './IStore'

export class AuthedUserStore {
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

    public logout(): void {
        this._userId = null
        this._token = null
    }
}
