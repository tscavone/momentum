import { IDataSettingsValue } from "../data_definitions/SettingsDefinitions";
import { Id } from "../util/Id";
import { IdentifiedObject } from "../util/IdentifiedObject";

export class SettingsValue extends IdentifiedObject{
    _value: string
    _entryId: Id

    constructor(){
        super();

        this._value = "";
        this._entryId = new Id();
    }

    public static fromJSON(jsonObj: IDataSettingsValue): SettingsValue {
        let entry = Object.assign(new SettingsValue(), jsonObj) as SettingsValue;
        entry._entryId = Id.fromString(jsonObj._entryId);
        entry.id = Id.fromString(jsonObj._id);
        
        return entry;
    }
}