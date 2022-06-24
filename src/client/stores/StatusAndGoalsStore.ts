// store for employee note objects
//

import { TemporalCollection } from '../util/TemporalCollection'
import { Id } from '../util/Id'
import { AbstractTemporalStore } from './AbstractTemporalStore'
import { StatusAndGoals } from '../value_objects/StatusAndGoals'
import {
    IDataStatusAndGoals,
    IDataStatusAndGoalsLoad,
    IDataTemporalObject,
    IDatedObject,
} from '../../shared/data_definitions/GlobalDefinitions'
import { DateRange } from '../util/DateRange'
import { dateToString } from '../../shared/utils'
import { SettingsStore } from './SettingsStore'
import { Goal } from '../value_objects/Goal'

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

    getSummarizedStatus(employeeID: string): string {
        return this.summarize([
            this.getCollectionForEmployee(employeeID).getLatestSaved().status,
        ])
    }

    getSummarizedGoals(
        employeeID: string,
        settingsStore: SettingsStore
    ): string {
        let goalNames: string[] = []

        for (const goal of this.getCollectionForEmployee(employeeID).current
            .goals) {
            goalNames.push(
                StatusAndGoalsStore.goalNameFromSettingId(settingsStore, goal)
            )
        }
        return this.summarize(goalNames)
    }

    async load(): Promise<string> {
        const employeeStatusAndGoalData =
            (await this._persistenceProvider.getStatusAndGoalData()) as IDataStatusAndGoalsLoad
        //clear all existing data
        this._allEmployeeObjects.clear()

        for (let employeeId in employeeStatusAndGoalData) {
            const statusAndGoalsData = employeeStatusAndGoalData[employeeId]
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

        return Promise.resolve('status and goals loaded')
    }

    write(): Promise<string> {
        if (this._persistenceProvider === null)
            throw new Error('peristenceProvider null in StatusAndGoalStore')

        let statusAndGoalsData: IDataStatusAndGoalsLoad = {}

        for (const [employeeID, temporalSAndGs] of this._allEmployeeObjects) {
            let serializedSAndGObject: IDataTemporalObject<IDataStatusAndGoals> =
                { _temporalObjects: [] }
            serializedSAndGObject._current = temporalSAndGs.current.serialize()

            for (const temporalSAndG of temporalSAndGs.getSaved(
                new DateRange(DateRange.BEFORE_TIMES, DateRange.AFTER_TIMES)
            )) {
                let datedNote: IDatedObject<IDataStatusAndGoals> = {
                    _obj: null,
                    _date: null,
                }
                datedNote._obj = temporalSAndG.obj.serialize()
                datedNote._date = dateToString(temporalSAndG.date)

                serializedSAndGObject._temporalObjects.push(datedNote)
            }

            statusAndGoalsData[employeeID] = serializedSAndGObject
        }

        return this._persistenceProvider.writeStatusAndGoalData(
            statusAndGoalsData
        )
    }

    static goalNameFromSettingId(settingsStore: SettingsStore, goal: Goal) {
        return settingsStore.getValueById(goal.settingValueId).value
    }
}
