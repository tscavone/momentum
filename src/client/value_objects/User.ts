// representation of a user of the system
//

import { IUserData } from "../data_definitions/UsersDefinitions";
import { Id } from "../util/Id";
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
    public static fromJSON(jsonObj: IUserData): User {
        let user = Object.assign(new User(), jsonObj) as User;
        user.id = Id.fromString(jsonObj._id);
        
        return user;
    }

}