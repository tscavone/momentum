// store for employees of the current user
//

import { Id } from '../util/Id'
import { Employee } from '../value_objects/Employee'
import { IStore } from './IStore'
import { IDataAllEmployees } from '../../shared/data_definitions/EmployeeDefinitions'
import { IWriteable } from '../persistence/IWriteable'
import { IPersistenceProvider } from '../persistence/IPersistenceProvider'
import { makeAutoObservable } from 'mobx'

export class EmployeeStore implements IStore, IWriteable {
    private _employees: Map<string, Employee>
    _persistenceProvider: IPersistenceProvider

    constructor() {
        makeAutoObservable(this)
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

    numEmployees(): number {
        return this._employees.size
    }

    async load(): Promise<string> {
        const jsonEmployeeData =
            (await this._persistenceProvider.getEmployeeData()) as IDataAllEmployees

        //clear all existing data
        this._employees.clear()

        for (const jsonId in jsonEmployeeData) {
            const user = Employee.fromJSON(jsonEmployeeData[jsonId])
            this._employees.set(jsonId, user as Employee)
        }

        return Promise.resolve('employees loaded')
    }

    save(employee: Employee) {
        this._employees.set(employee.id.id, employee)
    }

    get persistenceProvider(): IPersistenceProvider {
        return this._persistenceProvider
    }

    set persistenceProvider(value: IPersistenceProvider) {
        this._persistenceProvider = value
    }

    write(): Promise<string> {
        if (this._persistenceProvider === null)
            throw new Error('peristenceProvider null in Employee store')

        let employeeData: IDataAllEmployees = {}

        for (const [employeeID, employee] of this._employees) {
            employeeData[employeeID] = employee.serialize()
        }

        return this._persistenceProvider.writeEmployeeData(employeeData)
    }
}
