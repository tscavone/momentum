// store for employee note objects
//

import { TemporalCollection } from '../util/TemporalCollection'
import { Id } from '../util/Id'
import { IDataMomentum } from '../data_definitions/GlobalDefinitions'
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
            new TemporalCollection<StatusAndGoals>(
                StatusAndGoals.instantiate(
                    this.getCollectionForEmployee(employeeId)
                )
            )
        )
    }

    load(employeeData: IDataMomentum): void {
        //clear all existing data
        this._allEmployeeObjects.clear()

        for (let employeeId in employeeData) {
            const statusAndGoalsData = employeeData[employeeId]._statusAndGoals
            this.addEmployee(employeeId)

            let statusAndGoals: TemporalCollection<StatusAndGoals> =
                this.getCollectionForEmployee(employeeId)

            statusAndGoals.clear(StatusAndGoals.instantiate(statusAndGoals))

            statusAndGoalsData._temporalObjects.forEach(
                //todo: check for obj and date members
                (obj) =>
                    this.getCollectionForEmployee(employeeId).put(
                        StatusAndGoals.fromJSON(obj._obj),
                        new Date(obj._date)
                    )
            )

            //currently we're not saving the current object of a temporal collection, but we might want to in the future
            // to preserve people's work
            // also - we want to load / create current after we load everything so it can copy the latest goals
            if (statusAndGoalsData._current)
                statusAndGoals.current = StatusAndGoals.fromJSON(
                    statusAndGoalsData._current
                )
            else {
                statusAndGoals.current =
                    StatusAndGoals.instantiate(statusAndGoals)
            }
        }
    }
}
