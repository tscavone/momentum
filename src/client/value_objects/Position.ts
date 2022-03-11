// position that an employee has held
//      

import { DateRange } from "../util/DateRange";
import { IdentifiedObject } from "../util/IdentifiedObject";
import { PositionType } from "./PositionType";

export class Position extends IdentifiedObject {

    //
    //members
    //
    private _type: PositionType;
    private _range: DateRange;
    
    //
    //constructors
    //
    constructor(type: PositionType, range: DateRange) {
        super()
        this._type = type
        this._range = range
    }
    
    //
    //accessors
    //
    public get type(): PositionType {
        return this._type;
    }
    public set type(value: PositionType) {
        this._type = value;
    }
    public get range(): DateRange {
        return this._range;
    }
    public set range(value: DateRange) {
        this._range = value;
    }
    
    //
    //private methods
    //
    
    //
    //public methods
    //

}