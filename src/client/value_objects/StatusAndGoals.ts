// value object for holding a temporal value of an employee's status and goals
//

import { IDataStatusAndGoals } from '../data_definitions/GlobalDefinitions'
import { Id } from '../util/Id'
import { TemporalCollection } from '../util/TemporalCollection'
import { TemporalObject } from '../util/TemporalObject'
import { Goal } from './Goal'
import { Link } from './Link'

export class StatusAndGoals extends TemporalObject {
    private _status: string
    private _goals: Goal[]

    private constructor() {
        super()
        this._status = ''
        this._goals = []
    }

    public get status(): string {
        return this._status
    }
    public set status(value: string) {
        this._status = value
    }
    public get goals(): Goal[] {
        return this._goals
    }
    public set goals(value: Goal[]) {
        this._goals = value
    }

    isNewlyMinted(): boolean {
        return this._status === ''
    }

    static instantiate(
        statusAndGoalsHistory: TemporalCollection<StatusAndGoals>
    ) {
        const latestStatusAndGoals = statusAndGoalsHistory.getLatestSaved()

        let newStatusAndGoals = new StatusAndGoals()

        for (const goal of latestStatusAndGoals._goals) {
            newStatusAndGoals._goals.push(goal.deepClone())
        }

        return newStatusAndGoals
    }

    public static fromJSON(jsonObj: IDataStatusAndGoals): StatusAndGoals {
        let statusAndGoals = Object.assign(
            new StatusAndGoals(),
            jsonObj
        ) as StatusAndGoals
        statusAndGoals.id = Id.fromString(jsonObj._id)
        statusAndGoals.goals = []

        for (const jsonGoal of jsonObj._goals) {
            statusAndGoals.goals.push(Goal.fromJSON(jsonGoal) as Goal)
        }

        return statusAndGoals
    }
}
