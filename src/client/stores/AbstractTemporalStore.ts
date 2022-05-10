//
//
import { TemporalCollection } from '../util/TemporalCollection'
import { Id } from '../util/Id'
import { DateRange } from '../util/DateRange'
import { DatedObject } from '../util/DatedObject'
import { ITemporalStore } from './ITemporalStore'
import { IDataMomentum } from '../data_definitions/GlobalDefinitions'
import { clone } from 'lodash'
import { TemporalObject } from '../util/TemporalObject'
import { IPersistenceProvider } from '../persistence/IPersistenceProvider'
import { IWriteable } from '../persistence/IWriteable'

export abstract class AbstractTemporalStore<T extends TemporalObject>
    implements ITemporalStore<T>, IWriteable
{
    protected _allEmployeeObjects: Map<string, TemporalCollection<T>>
    _persistenceProvider: IPersistenceProvider

    constructor() {
        this._allEmployeeObjects = new Map<string, TemporalCollection<T>>()
        this._persistenceProvider = null
    }

    get persistenceProvider(): IPersistenceProvider {
        return this._persistenceProvider
    }

    set persistenceProvider(value: IPersistenceProvider) {
        this._persistenceProvider = value
    }

    protected getCollectionForEmployee(id: Id | string): TemporalCollection<T> {
        let stringId = Id.asString(id)

        return this._allEmployeeObjects.get(stringId)
    }

    getCurrent(employeeId: Id | string): T {
        const id = Id.asString(employeeId)
        return this._allEmployeeObjects.get(id).current
    }

    setCurrent(employeeId: Id | string, newValue: T) {
        const id = Id.asString(employeeId)
        this._allEmployeeObjects.get(id).current = clone(newValue)
    }

    save(employeeId: Id | string, date: Date, newCurrent: T) {
        const id = Id.asString(employeeId)
        this._allEmployeeObjects.get(id).save(newCurrent, date)
        this.write()
    }

    getSaved(id: Id | string, dateRange: DateRange): DatedObject<T>[] {
        const stringId = id instanceof Id ? id.id : id

        return this.getCollectionForEmployee(stringId)?.getSaved(dateRange)
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

    abstract addEmployee(newEmployeeId: Id | string): void

    abstract load(jsonObj: IDataMomentum, employeeId?: Id): void

    abstract write(): void
}
