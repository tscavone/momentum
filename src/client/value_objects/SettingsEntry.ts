// a type of setting with description of what that setting is for
//

import { IDataSettingsEntry } from "../data_definitions/SettingsDefinitions";
import { Id } from "../util/Id";
import { IdentifiedObject } from "../util/IdentifiedObject"

export class SettingsEntry extends IdentifiedObject{

    //
    //members
    //
    _name: string
    _description: string
    _potentialValues: SettingsEntry[]

    //
    //
    //
    constructor() {
        super();

        this._name = "";
        this._description = "";
        this._potentialValues = [];
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
    public static fromJSON(jsonObj: IDataSettingsEntry): SettingsEntry {
        let entry = Object.assign(new SettingsEntry(), jsonObj) as SettingsEntry;
        entry.id = Id.fromString(jsonObj._id);

        if(jsonObj._potentialValues){
            
            let potentialValues: SettingsEntry[] = 
                jsonObj._potentialValues.map( 
                    (potentialValue: IDataSettingsEntry) => Object.assign(new SettingsEntry(), potentialValue));

            entry._potentialValues = potentialValues;

        }

        return entry;
    }
}