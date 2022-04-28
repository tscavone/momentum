// value object for holding a temporal value of an employee's status and goals
//

import { IdentifiedObject } from '../util/IdentifiedObject'
import { Goal } from './Goal'

export class StatusAndGoals extends IdentifiedObject {
    private _status: string
    private _goals: Goal[]

    constructor() {
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
}
