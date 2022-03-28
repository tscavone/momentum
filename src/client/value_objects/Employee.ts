// representation of a user of the system
//

import { IEmployeeData } from '../data_definitions/EmployeeDefinitions'
import { Id } from '../util/Id'
import { IdentifiedObject } from '../util/IdentifiedObject'

export class Employee extends IdentifiedObject {
    //
    //members
    //
    private _first: String
    private _last: String

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
    public get first(): String {
        return this._first
    }
    public set first(value: String) {
        this._first = value
    }
    public get last(): String {
        return this._last
    }
    public set last(value: String) {
        this._last = value
    }

    //
    //private methods
    //

    //
    //public methods
    //
    public static fromJSON(jsonObj: IEmployeeData): Employee {
        let employee = Object.assign(new Employee(), jsonObj) as Employee
        employee.id = Id.fromString(jsonObj._id)

        return employee
    }
}
