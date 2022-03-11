// contains the notes 
//

import { Id } from "../util/Id";
import { IdentifiedObject } from "../util/IdentifiedObject";
 
export class Note extends IdentifiedObject {

    //
    //members
    //
    private _text: string; 
    
    //
    //constructors
    //
    constructor(){
        super();
        this._text = "";
    }

    //
    //accessors
    //
    public get text(): string {
        return this._text;
    }
    public set text(value: string) {
        this._text = value;
    }
        
    //
    //private methods
    //

    //
    //public methods
    //
    public static fromJSON(jsonObj: any): Note {
        let note = Object.assign(new Note(), jsonObj) as Note;
        note.id = Id.fromString(jsonObj._id);

        return note;
    }
}