//
//
import { TemporalCollection } from '../util/TemporalCollection'
import { Id } from '../util/Id'
import { DateRange } from '../util/DateRange'
import { DatedObject } from '../util/DatedObject'
import { IdentifiedObject } from '../util/IdentifiedObject'
import { ITemporalStore } from './ITemporalStore'
import {
    IDataIdentifiedObject,
    IDataTemporalObject,
} from '../data_definitions/GlobalDefinitions'
import { clone } from 'lodash'
import {} from 'typescript'
import { TemporalObject } from '../util/TemporalObject'

export abstract class AbstractTemporalStore<T extends TemporalObject>
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
    protected getEmployeeObjects(id: Id | string): TemporalCollection<T> {
        let stringId = Id.asString(id)

        return this._allEmployeeObjects.get(stringId)!
    }

    //
    //public methods
    //
    abstract addEmployee(newEmployeeId: Id | string): void

    getCurrent(employeeId: Id | string): T {
        const id = Id.asString(employeeId)
        return this._allEmployeeObjects.get(id).current
    }

    setCurrent(employeeId: Id | string, newValue: T) {
        const id = Id.asString(employeeId)
        this._allEmployeeObjects.get(id).current = clone(newValue)
    }

    save(employeeId: Id | string, date: Date) {
        const id = Id.asString(employeeId)
        this._allEmployeeObjects.get(id)!.save(date)
    }

    getSaved(id: Id | string, dateRange: DateRange): DatedObject<T>[] {
        const stringId = id instanceof Id ? id.id : id

        return this.getEmployeeObjects(stringId).getSaved(dateRange)
    }

    getAllSavedWithCurrent(id: Id | string): T[] {
        let retval: T[] = [this.getCurrent(id)]

        for (const datedObj of this.getSaved(
            id,
            DateRange.upTo(DateRange.AFTER_TIMES)
        ).values()) {
            retval.push(datedObj.obj as T)
        }

        return retval
    }

    getAllSaved(id: Id | string): DatedObject<T>[] {
        return this.getSaved(id, DateRange.upTo(DateRange.AFTER_TIMES))
    }

    abstract load(
        jsonObj: IDataTemporalObject<IDataIdentifiedObject>,
        employeeId?: Id
    ): void
}
