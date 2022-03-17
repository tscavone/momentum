//
//

import { IdentifiedObject } from '../util/IdentifiedObject'

export class StretchQuestion extends IdentifiedObject {
    //
    //members
    //
    private _question: string

    //
    //constructors
    //
    constructor() {
        super()

        this._question = ''
    }

    //
    //accessors
    //
    public get question(): string {
        return this._question
    }
    public set question(value: string) {
        this._question = value
    }

    //
    //private methods
    //

    //
    //public methods
    //
}
