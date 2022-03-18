// store for employee note objects
//

import { TemporalCollection } from '../util/TemporalCollection'
import { Id } from '../util/Id'
import { AbstractTemporalStore } from './AbstractTemporalStore'
import { Employee } from '../value_objects/Employee'
import { StretchAnswer } from '../value_objects/StretchAnswer'
import {
    IDataStretchAnswer,
    IDataTemporalObject,
} from '../data_definitions/GlobalDefinitions'

export class StretchAnswerStore extends AbstractTemporalStore<StretchAnswer> {
    //
    //constructors
    //
    constructor() {
        super()
    }

    //
    //public methods
    //
    addEmployee(newEmployee: Employee | string): void {
        const employeeId: string =
            newEmployee instanceof Employee ? newEmployee.id.id : newEmployee

        if (this._allEmployeeObjects.get(employeeId) !== undefined) {
            throw `adding employee over existing: ${employeeId}`
        }

        this._allEmployeeObjects.set(
            employeeId,
            new TemporalCollection<StretchAnswer>(new StretchAnswer())
        )
    }

    loadEmployee(
        jsonObj: IDataTemporalObject<IDataStretchAnswer>,
        employeeId?: Id
    ): void {
        this.addEmployee(employeeId.id)

        let stretchAnswers: TemporalCollection<StretchAnswer> =
            this.getEmployeeObjects(employeeId)

        stretchAnswers.clear(new StretchAnswer())
        stretchAnswers.current = StretchAnswer.fromJSON(jsonObj._current)

        jsonObj._temporalObjects.forEach((obj) =>
            this.getEmployeeObjects(employeeId).put(
                StretchAnswer.fromJSON(obj._obj),
                new Date(obj._date)
            )
        )
    }
}
