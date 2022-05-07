// store for employee note objects
//

import { TemporalCollection } from '../util/TemporalCollection'
import { Id } from '../util/Id'
import { AbstractTemporalStore } from './AbstractTemporalStore'
import { StretchAnswer } from '../value_objects/StretchAnswer'
import { IDataMomentum } from '../data_definitions/GlobalDefinitions'

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
    addEmployee(newEmployeeId: Id | string): void {
        const employeeId = Id.asString(newEmployeeId)

        if (this._allEmployeeObjects.get(employeeId) !== undefined) {
            throw `adding employee over existing: ${employeeId}`
        }

        this._allEmployeeObjects.set(
            employeeId,
            new TemporalCollection<StretchAnswer>(new StretchAnswer())
        )
    }

    getAnswer(employeeId: string | Id, questionId: string | Id): StretchAnswer {
        let questionIdStr = Id.asString(questionId)
        let employeeIdStr = Id.asString(employeeId)

        return this.getCollectionForEmployee(employeeIdStr).getSavedById(
            questionIdStr
        )
    }

    load(employeeData: IDataMomentum): void {
        //clear all existing data
        this._allEmployeeObjects.clear()

        for (let employeeId in employeeData) {
            const stretchData = employeeData[employeeId]._stretchAnswers
            this.addEmployee(employeeId)

            let stretchAnswers: TemporalCollection<StretchAnswer> =
                this.getCollectionForEmployee(employeeId)

            //currently we're not saving the current object of a temporal collection, but we might want to in the future
            // to preserve people's work
            if (stretchData._current)
                stretchAnswers.current = StretchAnswer.fromJSON(
                    stretchData._current
                )

            stretchData._temporalObjects.forEach((obj) =>
                this.getCollectionForEmployee(employeeId).put(
                    StretchAnswer.fromJSON(obj._obj),
                    new Date(obj._date)
                )
            )
        }
    }
}
