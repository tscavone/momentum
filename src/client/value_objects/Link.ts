// a hyperlink
//

import { IdentifiedObject } from "../util/IdentifiedObject";

export class Link extends IdentifiedObject {

    //
    //members
    //
    private _text: string;
    private _target: string;
    
    //
    // constructors
    //
    constructor(text: string, target: string) {
        super();
        this._text = text
        this._target = target
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
    public get target(): string {
        return this._target;
    }
    public set target(value: string) {
        this._target = value;
    }
    
    //
    //private methods
    //
    
    //
    //public methods
    //

}