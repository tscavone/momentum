// A job position
//

import { IdentifiedObject } from "../util/IdentifiedObject";

export class PositionType extends IdentifiedObject{

    //
    //members
    //
    private _title: string;
    private _description: string;
    
    //
    //constructors
    //
    constructor(){
        super();
        this._title = "";
        this._description = "";
    }

    //
    //accessors
    //
    public get title(): string {
        return this._title;
    }
    public set title(value: string) {
        this._title = value;
    }
    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }
    
    //
    //private methods
    //

    //
    //public methods
    //

}