// a type of setting whose values are an enumeration (tho not a typescript enumeration)
//
import { SettingsEntry } from "./SettingsEntry";

export class EnumeratedSettingsEntry extends SettingsEntry {

    //
    //members
    //
    potentialValues: SettingsEntry[]

    //
    //constructors
    //
    constructor(){
        super();

        this.potentialValues = [];
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
    addPotentialValue(potentialValue: string, potentialValueDescription?: string) {
        let entry: SettingsEntry = new SettingsEntry();

        entry._name = potentialValue;
        entry._description = potentialValueDescription ? potentialValueDescription : "";

        this.potentialValues.push(entry);
    }
}  