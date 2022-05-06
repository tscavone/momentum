// a goal for an employee
//

import { IDataGoal } from '../data_definitions/GlobalDefinitions'
import { Id } from '../util/Id'
import { IdentifiedObject } from '../util/IdentifiedObject'
import { Link } from './Link'
import { Milestone } from './Milestone'

export class Goal extends IdentifiedObject {
    private _settingValueId: Id
    private _details: string
    private _milestones: Milestone[] //currently unused
    private _links: Link[]
    private _progress: number

    constructor() {
        super()
        this._settingValueId = new Id()
        this._details = ''
        this._milestones = [] //unused
        this._links = []
        this._progress = 0
    }

    public get settingValueId(): Id {
        return this._settingValueId
    }
    public set settingValueId(value: Id) {
        this._settingValueId = value
    }
    public get details(): string {
        return this._details
    }
    public set details(value: string) {
        this._details = value
    }
    public get links(): Link[] {
        return this._links
    }
    public set links(value: Link[]) {
        this._links = value
    }
    public get progress(): number {
        return this._progress
    }
    public set progress(value: number) {
        this._progress = value
    }

    public deepClone(): Goal {
        let newGoal = new Goal()

        newGoal._details = this._details
        newGoal._milestones = []
        newGoal._progress = this._progress
        newGoal._settingValueId = this._settingValueId

        for (const link of this._links) {
            newGoal._links.push(link.deepClone())
        }

        return newGoal
    }

    public static fromJSON(jsonGoal: IDataGoal): Goal {
        let goal = Object.assign(new Goal(), jsonGoal) as Goal
        goal.id = Id.fromString(jsonGoal._id)
        goal._settingValueId = Id.fromString(jsonGoal._settingValueId)
        goal.links = []

        for (const jsonLink of jsonGoal._links) {
            goal.links.push(Link.fromJSON(jsonLink) as Link)
        }
        return goal
    }

    public serialize(): IDataGoal {
        return {
            _id: this.id.id,
            _settingValueId: this._settingValueId.id,
            _details: this._details,
            _progress: this._progress,
            _links: this._links.map((link) => link.serialize()),
            _milestones: [],
        }
    }
}
