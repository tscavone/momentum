//
//
import { TemporalCollection } from '../util/TemporalCollection'
import { Id } from '../util/Id'
import { DateRange } from '../util/DateRange'
import { DatedObject } from '../util/DatedObject'
import { ITemporalStore } from './ITemporalStore'
import { TemporalObject } from '../util/TemporalObject'
import { IPersistenceProvider } from '../persistence/IPersistenceProvider'
import { IWriteable } from '../persistence/IWriteable'

export abstract class AbstractTemporalStore<T extends TemporalObject>
    implements ITemporalStore<T>, IWriteable
{
    protected _allEmployeeObjects: Map<string, TemporalCollection<T>>
    _persistenceProvider: IPersistenceProvider
    SUMMARY_TEXT_LENGTH: number = 75

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

    getCollectionForEmployee(id: Id | string): TemporalCollection<T> {
        let stringId = Id.asString(id)

        return this._allEmployeeObjects.get(stringId)
    }

    getCurrent(employeeId: Id | string): T {
        const id = Id.asString(employeeId)
        return this._allEmployeeObjects.get(id).current
    }

    setCurrent(employeeId: Id | string, newValue: T) {
        const id = Id.asString(employeeId)
        this._allEmployeeObjects.get(id).current = newValue
    }

    save(employeeId: Id | string, date: Date, newCurrent: T): Promise<string> {
        const id = Id.asString(employeeId)
        this._allEmployeeObjects.get(id).save(newCurrent, date)
        return this.write()
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

    summarize(textsToSummarize: string[]): string {
        let retval = ''

        if (textsToSummarize.length === 1) {
            retval =
                textsToSummarize[0].substring(0, this.SUMMARY_TEXT_LENGTH - 3) +
                '...'
        } else {
            //5 below is for '..., '
            const individualTextLength: number =
                (this.SUMMARY_TEXT_LENGTH - 5 * textsToSummarize.length) /
                textsToSummarize.length

            for (const textToSummarize of textsToSummarize) {
                //add comma and space to
                if (retval !== '') retval += ', '
                retval +=
                    textToSummarize.substring(0, individualTextLength) + '...'
            }
        }

        return retval
    }

    abstract addEmployee(newEmployeeId: Id | string): void

    abstract load(): Promise<string>

    abstract write(): Promise<string>
}
