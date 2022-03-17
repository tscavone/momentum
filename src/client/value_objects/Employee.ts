// An employee, or direct report to a Manager/User
//

import { IdentifiedObject } from '../util/IdentifiedObject'

export class Employee extends IdentifiedObject {
    //
    //members
    //
    _first: string
    _last: string

    //
    //constructors
    //
    constructor() {
        super()

        this._first = 'UNINITIALIZED'
        this._last = 'UNINITIAILIZED'
    }

    //
    //accessors
    //

    //
    //private methods
    //

    //
    //public methods
    //
}
