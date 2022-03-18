// declares methods used by value object stores
//

import { DatedObject } from '../util/DatedObject'
import { DateRange } from '../util/DateRange'
import { Id } from '../util/Id'
import { IdentifiedObject } from '../util/IdentifiedObject'
import { IStore } from './IStore'

export interface ITemporalStore extends IStore {
    setCurrent(employeeId: Id, newValue: IdentifiedObject): void
    save(id: Id, date: Date): void
    getSaved(
        id: Id | string,
        dateRange: DateRange
    ): DatedObject<IdentifiedObject>[]
    loadEmployee(jsonObj: any, employeeId: Id): void
}
