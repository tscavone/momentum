// declares methods used by value object stores
//

import { Id } from '../util/Id'

export interface IStore {
    loadEmployee(jsonObj: any, employeeId?: Id): void
}
