// An object that contains a date timestamp
//

import { IDatedObject } from '../data_definitions/GlobalDefinitions'
import { ISerializable } from './ISerializable'
import { dateToString } from './utils'

export class DatedObject<T extends ISerializable> implements ISerializable {
    //
    //members
    //
    private _date: Date
    private _obj: T

    //
    //constructors
    //
    constructor(date: Date, obj: T) {
        this._date = date
        this._obj = obj
    }

    //
    //accessors
    //
    get date(): Date {
        return this._date
    }

    get obj(): T {
        return this._obj
    }

    serialize(): IDatedObject<T> {
        let retval: IDatedObject<T> = { _obj: null, _date: null }
        retval._obj = this._obj.serialize() as T
        retval._date = dateToString(this._date)

        return retval
    }
}
