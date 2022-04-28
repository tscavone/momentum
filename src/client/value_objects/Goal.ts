// a goal for an employee
//

import { IdentifiedObject } from '../util/IdentifiedObject'
import { GoalType } from './GoalType'
import { Link } from './Link'
import { Note } from './Note'
import { Milestone } from './Milestone'

export class Goal extends IdentifiedObject {
    //
    //members
    //
    private _name: string
    private _description: string
    private _milestones: Milestone[]
    private _types: GoalType[]
    private _links: Link[]
    private _progress: number

    //
    //constructors
    //
    constructor() {
        super()
        this._name = ''
        this._description = ''
        this._milestones = [] //unused
        this._types = []
        this._links = []
        this._progress = 0
    }

    //
    //accessors
    //
    public get name(): string {
        return this._name
    }
    public set name(value: string) {
        this._name = value
    }
    public get description(): string {
        return this._description
    }
    public set description(value: string) {
        this._description = value
    }
    public get type(): GoalType[] {
        return this._types
    }
    public set type(value: GoalType[]) {
        this._types = value
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

    //
    //private methods
    //

    //
    //public methods
    //
}
