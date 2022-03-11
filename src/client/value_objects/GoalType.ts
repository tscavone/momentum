// 
//

import { IdentifiedObject } from "../util/IdentifiedObject";
import { Milestone } from "./Milestone";
import { Link } from "./Link";

export class GoalType extends IdentifiedObject {

    //
    //members
    //
    private _name: string;
    private _description: string;
    private _milestones: Milestone[];
    private _links: Link[];
    
    //
    //constructors
    //
    constructor(
        name: string, 
        description: string, 
        milestones: Milestone[], 
        links: Link[]
        ) {
            super();
            this._name = name;
            this._description = description;
            this._milestones = milestones;
            this._links = links;
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
    public get links(): Link[] {
        return this._links;
    }
    public set links(value: Link[]) {
        this._links = value;
    }
            
    //
    //private methods
    //
    
    //
    //public methods
    //

}