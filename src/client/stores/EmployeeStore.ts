// store for employees of the current user
//

import { Id } from '../util/Id'
import { Employee } from '../value_objects/Employee'
import { IStore } from './IStore'
import {
    IEmployeeData,
    IGlobalEmployeeData,
} from '../data_definitions/EmployeeDefinitions'

export class EmployeeStore implements IStore {
    //
    //members
    //
    private _employees: Map<string, Employee>

    //
    //constructors
    //
    constructor() {
        this._employees = new Map<string, Employee>()
    }
    //
    //accessors
    //
    get employees() {
        return this._employees
    }

    //
    //private methods
    //

    //
    //public methods
    //
    getEmployee(employeeId: Id | string): Employee {
        const id = Id.asString(employeeId)

        return this._employees.get(id)
    }

    load(jsonObj: { [key: string]: IEmployeeData }): void {
        //clear all existing data
        this._employees.clear()

        for (const jsonId in jsonObj) {
            const user = Employee.fromJSON(jsonObj[jsonId])
            this._employees.set(jsonId, user as Employee)
        }
    }
}
