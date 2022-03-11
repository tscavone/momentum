// Milestones mark a significant point of a Goal / GoalType
//

export class Milestone {

    //
    //members
    //
    private _name: string;
    private _description: string;
    private _percent: string;
    
    //
    //constructors
    //
    constructor(name: string, description: string, percent: string) {
        this._name = name;
        this._description = description;
        this._percent = percent;
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
    public get percent(): string {
        return this._percent;
    }
    public set percent(value: string) {
        this._percent = value;
    }
    
    //
    //private methods
    //

    //
    //public methods
    //

}   