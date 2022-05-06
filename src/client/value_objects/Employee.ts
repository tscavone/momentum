// representation of a user of the system
//

import { IDataEmployee } from '../data_definitions/EmployeeDefinitions'
import { IDataIdentifiedObject } from '../data_definitions/GlobalDefinitions'
import { Id } from '../util/Id'
import { IdentifiedObject } from '../util/IdentifiedObject'

export class Employee extends IdentifiedObject {
    //
    //members
    //
    private _first: string
    private _last: string

    //
    //constructors
    //
    constructor() {
        super()

        this._first = ''
        this._last = ''
    }

    //
    //accessors
    //
    public get first(): string {
        return this._first
    }
    public set first(value: string) {
        this._first = value
    }
    public get last(): string {
        return this._last
    }
    public set last(value: string) {
        this._last = value
    }

    //
    //private methods
    //

    //
    //public methods
    //
    public static fromJSON(jsonObj: IDataEmployee): Employee {
        let employee = Object.assign(new Employee(), jsonObj) as Employee
        employee.id = Id.fromString(jsonObj._id)

        return employee
    }

    public serialize(): IDataEmployee {
        return {
            _id: this.id.id,
            _first: this._first,
            _last: this._last,
        }
    }
}
