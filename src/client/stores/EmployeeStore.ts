// store for employees of the current user
//

import { Id } from '../util/Id'
import { Employee } from '../value_objects/Employee'
import { IStore } from './IStore'
import { IGlobalEmployeeData } from '../data_definitions/EmployeeDefinitions'

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
    getEmployee(passedId: Id | string): Employee {
        const id = passedId instanceof Id ? passedId.id : passedId

        return this._employees.get(id)
    }

    load(jsonObj: IGlobalEmployeeData, employeeId?: Id): void {
        //because we can't overload 'load' :/
        if (employeeId)
            throw "Settings Store doesn't use employeeId so this was most likely called in error"

        for (const jsonId in jsonObj) {
            const user = Employee.fromJSON(jsonObj[jsonId])
            this._employees.set(jsonId, user as Employee)
        }
    }
}
