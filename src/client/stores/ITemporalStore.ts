// declares methods used by value object stores
//

import { DatedObject } from '../util/DatedObject'
import { DateRange } from '../util/DateRange'
import { Id } from '../util/Id'
import { IdentifiedObject } from '../util/IdentifiedObject'
import { IStore } from './IStore'

export interface ITemporalStore<T> extends IStore {
    setCurrent(employeeId: Id | string, newValue: IdentifiedObject): void
    getCurrent(employeeId: Id | string)
    save(id: Id | string, date: Date, newCurrent: T): void
    getSaved(
        id: Id | string,
        dateRange: DateRange
    ): DatedObject<IdentifiedObject>[]
    load(): Promise<string>
}
