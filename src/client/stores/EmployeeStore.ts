// store for employees of the current user
//

import { Id } from '../util/Id'
import { Employee } from '../value_objects/Employee'
import { IStore } from './IStore'
import { IDataAllEmployees } from '../data_definitions/EmployeeDefinitions'
import { IWriteable } from '../persistence/IWriteable'
import { IPersistenceProvider } from '../persistence/IPersistenceProvider'

export class EmployeeStore implements IStore, IWriteable {
    private _employees: Map<string, Employee>
    _persistenceProvider: IPersistenceProvider

    constructor() {
        this._employees = new Map<string, Employee>()
        this._persistenceProvider = null
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

    load(): void {
        const jsonEmployeeData = this._persistenceProvider.getEmployeeData()

        //clear all existing data
        this._employees.clear()

        for (const jsonId in jsonEmployeeData) {
            const user = Employee.fromJSON(jsonEmployeeData[jsonId])
            this._employees.set(jsonId, user as Employee)
        }
    }

    get persistenceProvider(): IPersistenceProvider {
        return this._persistenceProvider
    }

    set persistenceProvider(value: IPersistenceProvider) {
        this._persistenceProvider = value
    }

    write(): void {
        if (this._persistenceProvider === null)
            throw new Error('peristenceProvider null in Employee store')

        let employeeData: IDataAllEmployees = {}

        for (const [employeeID, employee] of this._employees) {
            employeeData[employeeID] = employee.serialize()
        }

        this._persistenceProvider.writeEmployeeData(employeeData)
    }
}
