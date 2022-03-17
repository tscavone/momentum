//
//
import { TemporalCollection } from '../util/TemporalCollection'
import { Id } from '../util/Id'
import { DateRange } from '../util/DateRange'
import { DatedObject } from '../util/DatedObject'
import { IdentifiedObject } from '../util/IdentifiedObject'
import { ITemporalStore } from './ITemporalStore'
import {
    IDataEmployee,
    IDataIdentifiedObject,
    IDataTemporalObject,
} from '../data_definitions/GlobalDefinitions'
import { Employee } from '../value_objects/Employee'
import { clone } from 'lodash'

export abstract class AbstractTemporalStore<T extends IdentifiedObject>
    implements ITemporalStore
{
    //
    //members
    //
    protected _allEmployeeObjects: Map<string, TemporalCollection<T>>

    //
    //constructors
    //
    constructor() {
        this._allEmployeeObjects = new Map<string, TemporalCollection<T>>()
    }
    //
    //accessors
    //

    //
    //private methods
    //
    protected getEmployeeObjects(employeeId: Id): TemporalCollection<T> {
        return this._allEmployeeObjects.get(employeeId.id)!
    }

    //
    //public methods
    //
    abstract addEmployee(newEmployee: Employee): void

    setCurrent(employeeId: Id, newValue: T) {
        this._allEmployeeObjects.get(employeeId.id)!.current = clone(newValue)
    }
    save(id: Id, date: Date) {
        this._allEmployeeObjects.get(id.id)!.save(date)
    }

    getSaved(id: Id, dateRange: DateRange): DatedObject<IdentifiedObject>[] {
        return this.getEmployeeObjects(id).getSaved(dateRange)
    }

    abstract load(
        jsonObj: IDataTemporalObject<IDataIdentifiedObject>,
        employeeId?: Id
    ): void
}
