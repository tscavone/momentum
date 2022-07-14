// The store that contains the selected employee at the global level
//
import { makeAutoObservable } from 'mobx'
import { Id } from '../util/Id'

export class AuthedUserStore {
    //
    //members
    //
    private _userId: Id
    private _token: string
    private _needsInit: boolean

    //
    //constructor
    //
    constructor() {
        makeAutoObservable(this)
        this._userId = null
        this._token = null
        this._needsInit = false
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
    public get needsInit(): boolean {
        return this._needsInit
    }
    public set needsInit(value: boolean) {
        this._needsInit = value
    }
    public logout(): void {
        this._userId = null
        this._token = null
    }
}
