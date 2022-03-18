//
//
import { IDataStretchAnswer } from '../data_definitions/GlobalDefinitions'
import { Id } from '../util/Id'
import { IdentifiedObject } from '../util/IdentifiedObject'

export class StretchAnswer extends IdentifiedObject {
    //
    //members
    //
    private _answer: string
    private _question: string

    //
    // constructors
    //
    constructor() {
        super()
        this._answer = null
        this._question = null
    }

    //
    //accessors
    //
    public get answer(): string {
        return this._answer
    }
    public set answer(value: string) {
        this._answer = value
    }
    public get question(): string {
        return this._question
    }
    public set question(value: string) {
        this._question = value
    }

    //
    //public methods
    //
    public static fromJSON(jsonObj: IDataStretchAnswer): StretchAnswer {
        let note = Object.assign(new StretchAnswer(), jsonObj) as StretchAnswer
        note.id = Id.fromString(jsonObj._id)

        return note
    }
}
