// a type of setting whose values are an enumeration (tho not a typescript enumeration)
//
import { SettingsEntry } from './SettingsEntry'

export class EnumeratedSettingsEntry {
    // extends SettingsEntry { Not sure if this class even needs to exist, but something's off with it's inheritance

    //
    //members
    //
    _potentialValues: SettingsEntry[]

    //
    //constructors
    //
    constructor() {
        //super()

        this._potentialValues = []
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
    addPotentialValue(
        potentialValue: string,
        potentialValueDescription?: string
    ) {
        let entry: SettingsEntry = new SettingsEntry()

        entry.name = potentialValue
        entry.description = potentialValueDescription
            ? potentialValueDescription
            : ''

        this._potentialValues.push(entry)
    }
}
