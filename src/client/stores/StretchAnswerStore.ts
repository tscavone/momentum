// store for employee note objects
//

import { TemporalCollection } from '../util/TemporalCollection'
import { Id } from '../util/Id'
import { AbstractTemporalStore } from './AbstractTemporalStore'
import { StretchAnswer } from '../value_objects/StretchAnswer'
import {
    IDataStretchAnswer,
    IDataStretchLoad,
    IDataTemporalObject,
    IDatedObject,
} from '../data_definitions/GlobalDefinitions'
import { DateRange } from '../util/DateRange'
import { dateToString } from '../util/utils'

export class StretchAnswerStore extends AbstractTemporalStore<StretchAnswer> {
    constructor() {
        super()
    }

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

    load(): void {
        const employeeStretchData = this._persistenceProvider.getStretchData()

        //clear all existing data
        this._allEmployeeObjects.clear()

        for (let employeeId in employeeStretchData) {
            const stretchData = employeeStretchData[employeeId]
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

    write(): void {
        if (this._persistenceProvider === null)
            throw new Error('peristenceProvider null in StretchStore')

        let stretchData: IDataStretchLoad = {}

        for (const [employeeID, temporalStretchAnswers] of this
            ._allEmployeeObjects) {
            let serializedTemportalStretch: IDataTemporalObject<IDataStretchAnswer> =
                { _temporalObjects: [] }

            serializedTemportalStretch._current =
                temporalStretchAnswers.current.serialize()

            for (const temporalStretchAnswer of temporalStretchAnswers.getSaved(
                new DateRange(DateRange.BEFORE_TIMES, DateRange.AFTER_TIMES)
            )) {
                let datedNote: IDatedObject<IDataStretchAnswer> = {
                    _obj: null,
                    _date: null,
                }
                datedNote._obj = temporalStretchAnswer.obj.serialize()
                datedNote._date = dateToString(temporalStretchAnswer.date)

                serializedTemportalStretch._temporalObjects.push(datedNote)
            }

            stretchData[employeeID] = serializedTemportalStretch
        }

        this.persistenceProvider.writeStretchData(stretchData)
    }
}
