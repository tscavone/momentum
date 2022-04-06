// contains the notes
//

import { IDataNote } from '../data_definitions/GlobalDefinitions'
import { Id } from '../util/Id'
import { TemporalObject } from '../util/TemporalObject'

export class Note extends TemporalObject {
    //
    //members
    //
    private _text: string

    //
    //constructors
    //
    constructor() {
        super()
        this._text = null
    }

    //
    //accessors
    //
    public get text(): string {
        return this._text
    }
    public set text(value: string) {
        this._text = value
    }

    //
    //public methods
    //
    isNewlyMinted(): boolean {
        return this.text === null
    }

    public static fromJSON(jsonObj: IDataNote): Note {
        let note = Object.assign(new Note(), jsonObj) as Note
        note.id = Id.fromString(jsonObj._id)

        return note
    }
}
