// store for users of the momentum app
//

import { Id } from "../util/Id";
import { User } from "../value_objects/User";
import { IStore } from "./IStore";
import { IGlobalUserData } from "../data_definitions/UsersDefinitions";

export class UserStore implements IStore {
    
    //
    //members
    //
    private _users : Map<string, User>

    //
    //constructors
    //
    constructor(){
        this._users = new Map<string, User>()
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

    load(jsonObj: IGlobalUserData, employeeId?: Id): void {
        //because we can't overload 'load' :/
        if(employeeId)
            throw "Settings Store doesn't use employeeId so this was most likely called in error"
    
        for(const jsonId in jsonObj){
            const user = User.fromJSON(jsonObj[jsonId]);
            this._users.set(jsonId, (user as User));
        }
    }
}