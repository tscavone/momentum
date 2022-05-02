// a goal for an employee
//

import { IDataGoal } from '../data_definitions/GlobalDefinitions'
import { Id } from '../util/Id'
import { IdentifiedObject } from '../util/IdentifiedObject'
import { Link } from './Link'
import { Milestone } from './Milestone'

export class Goal extends IdentifiedObject {
    private _settingEntryId: Id
    private _details: string
    private _milestones: Milestone[] //currently unused
    private _links: Link[]
    private _progress: number

    constructor() {
        super()
        this._settingEntryId = new Id()
        this._details = ''
        this._milestones = [] //unused
        this._links = []
        this._progress = 0
    }

    public get settingEntryId(): Id {
        return this._settingEntryId
    }
    public set settingEntryId(value: Id) {
        this._settingEntryId = value
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
        newGoal._settingEntryId = this._settingEntryId

        for (const link of this._links) {
            newGoal._links.push(link.deepClone())
        }

        return newGoal
    }

    public static fromJSON(jsonGoal: IDataGoal): Goal {
        let goal = Object.assign(new Goal(), jsonGoal) as Goal
        goal.id = Id.fromString(jsonGoal._id)
        goal._settingEntryId = Id.fromString(jsonGoal._settingEntryId)
        goal.links = []

        for (const jsonLink of jsonGoal._links) {
            goal.links.push(Link.fromJSON(jsonLink) as Link)
        }
        return goal
    }
}
