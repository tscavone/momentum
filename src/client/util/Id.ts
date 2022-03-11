// a guid that is used to identify objects
//

import {v4 as uuidv4} from 'uuid'

export class Id {

    //
    //members
    //
    private _id: string;
    
    //
    //constructors
    //
    constructor(){
        this._id = uuidv4();
    }
    
    //
    //accessors
    //
    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }

    //
    //private methods
    //

    //
    //public methods
    //

    static fromString(id: string){
        return Object.assign(new Id(), {_id: id});
    }
}