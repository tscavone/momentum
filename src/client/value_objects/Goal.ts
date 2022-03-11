// a goal for an employee 
//

import { IdentifiedObject } from "../util/IdentifiedObject";
import { GoalType } from "./GoalType";
import { Link } from "./Link";
import { Note } from "./Note";
import { Milestone } from "./Milestone";

export class Goal extends IdentifiedObject{
    
    //
    //members
    //
    private _name: string;
    private _description: string;
    private _milestones: Milestone[];
    private _type: GoalType;
    private _links: Link[];
    private _percentComplete: number;
    private _notes: Note[];
    
    //
    //constructors
    //
    constructor(
        name: string, 
        description: string, 
        milestones: Milestone[], 
        type: GoalType, 
        links: Link[], 
        percentComplete: number, 
        notes: Note[]) 
    {
        super()
        this._name = name
        this._description = description
        this._milestones = milestones
        this._type = type
        this._links = links
        this._percentComplete = percentComplete
        this._notes = notes
    }

    //
    //accessors
    //
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }
    public get milestones(): Milestone[] {
        return this._milestones;
    }
    public set milestones(value: Milestone[]) {
        this._milestones = value;
    }
    public get type(): GoalType {
        return this._type;
    }
    public set type(value: GoalType) {
        this._type = value;
    }
    public get links(): Link[] {
        return this._links;
    }
    public set links(value: Link[]) {
        this._links = value;
    }
    public get percentComplete(): number {
        return this._percentComplete;
    }
    public set percentComplete(value: number) {
        this._percentComplete = value;
    }
    public get notes(): Note[] {
        return this._notes;
    }
    public set notes(value: Note[]) {
        this._notes = value;
    }
    
    //
    //private methods
    //
    
    //
    //public methods
    //
    
}