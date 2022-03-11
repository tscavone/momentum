// representation of a user of the system
//

import { IdentifiedObject } from "../util/IdentifiedObject";

export class User extends IdentifiedObject{

    //
    //members
    //
    _first : String;
    _last : String;

    //
    //constructors
    //
    constructor(){
        super();

        this._first = "";
        this._last = "";
    }

    //
    //accessors
    //

    //
    //private methods
    //

    //
    //public methods
    //

}