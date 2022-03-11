// 
//

import { IdentifiedObject } from "../util/IdentifiedObject";
import { PositionType } from "./PositionType";

export class StretchQuestion extends IdentifiedObject {

    //
    //members
    //
    private _question: string;
    private _positionLevel: PositionType;       
    
    //
    //constructors
    //
    constructor(){
        super();
        
        this._question = "";
        this._positionLevel = new PositionType();
    }
    
    //
    //accessors
    //
    public get question(): string {
        return this._question;
    }
    public set question(value: string) {
        this._question = value;
    }
    public get positionLevel(): PositionType {
        return this._positionLevel;
    }
    public set positionLevel(value: PositionType) {
        this._positionLevel = value;
    }
    
    //
    //private methods
    //
    
    //
    //public methods
    //
    
}