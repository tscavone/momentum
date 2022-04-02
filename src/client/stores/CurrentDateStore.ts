// a store to provide a global date used for debug/demo purposes
//

import { makeAutoObservable } from 'mobx'

export class CurrentDateStore {
    //
    //members
    //
    private _date: Date

    //
    //constructors
    //
    constructor() {
        makeAutoObservable(this)
        this._date = new Date()
    }

    //
    //accessors
    //
    public get date(): Date {
        return this._date
    }
    public set date(value: Date) {
        this._date = value
    }

    //
    //private methods
    //

    //
    //public methods
    //
}
