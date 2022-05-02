// store for employee note objects
//

import { TemporalCollection } from '../util/TemporalCollection'
import { Id } from '../util/Id'
import { IDataEmployees } from '../data_definitions/GlobalDefinitions'
import { AbstractTemporalStore } from './AbstractTemporalStore'
import { StatusAndGoals } from '../value_objects/StatusAndGoals'

export class StatusAndGoalsStore extends AbstractTemporalStore<StatusAndGoals> {
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
            new TemporalCollection<StatusAndGoals>(StatusAndGoals.instantiate())
        )
    }

    load(employeeData: IDataEmployees): void {
        //clear all existing data
        this._allEmployeeObjects.clear()

        for (let employeeId in employeeData) {
            const statusAndGoalsData = employeeData[employeeId]._statusAndGoals
            this.addEmployee(employeeId)

            let statusAndGoals: TemporalCollection<StatusAndGoals> =
                this.getEmployeeObjects(employeeId)

            statusAndGoals.clear(StatusAndGoals.instantiate())

            //currently we're not saving the current object of a temporal collection, but we might want to in the future
            // to preserve people's work
            if (statusAndGoalsData._current)
                statusAndGoals.current = StatusAndGoals.fromJSON(
                    statusAndGoalsData._current
                )

            statusAndGoalsData._temporalObjects.forEach(
                //todo: check for obj and date members
                (obj) =>
                    this.getEmployeeObjects(employeeId).put(
                        StatusAndGoals.fromJSON(obj._obj),
                        new Date(obj._date)
                    )
            )
        }
    }
}
