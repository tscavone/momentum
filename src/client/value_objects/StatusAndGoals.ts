// value object for holding a temporal value of an employee's status and goals
//

import {
    IDataIdentifiedObject,
    IDataStatusAndGoals,
} from '../../shared/data_definitions/GlobalDefinitions'
import { Id } from '../util/Id'
import { TemporalCollection } from '../util/TemporalCollection'
import { TemporalObject } from '../util/TemporalObject'
import { Goal } from './Goal'

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

    //we create new instances of this class by copying in the latest goals, unless
    //this is the first instance of the temporal collection in which we instantiate them
    //as an empty array
    static instantiate(
        statusAndGoalsHistory?: TemporalCollection<StatusAndGoals>
    ) {
        let newStatusAndGoals = new StatusAndGoals()

        //only copy previous goals if this is not the first statusAndGoals object
        if (statusAndGoalsHistory && statusAndGoalsHistory.getLatestSaved()) {
            const latestSavedStatusAndGoals =
                statusAndGoalsHistory.getLatestSaved()

            for (const goal of latestSavedStatusAndGoals._goals) {
                newStatusAndGoals._goals.push(goal.deepClone())
            }
        } else {
            newStatusAndGoals._goals = []
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

    public serialize(): IDataStatusAndGoals {
        return {
            _id: this.id.id,
            _status: this._status,
            _goals: this._goals.map((goal) => goal.serialize()),
        }
    }
}
