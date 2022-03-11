import { Id } from "../util/Id";
import { SettingsValue } from "../value_objects/SettingsValue";
import { SettingsEntry } from "../value_objects/SettingsEntry";
import { IStore } from "./IStore";
import { IDataSettings } from "../data_definitions/SettingsDefinitions";
import { SettingsValueWithDesc } from "../value_objects/SettingsValueWithDesc";


export class SettingsStore implements IStore {

    settingsTestData : IDataSettings = {
        "entries":[
          {
            _id: "1200",
            _name: "Position",
            _description: "An employment-level for software engineers",
          }
        ],
        "values": [
          {
            _id: "1200-10",
            _name: "Associate Software Engineer",
            _description: "Somebody just starting out. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
            _entryId: "1200"
          },
          {
            _id: "1200-20",
            _name: "Software Engineer",
            _description: "Somebody who has been at it for a while. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
            _entryId: "1200"
          },
          {
            _id: "1200-30",
            _name: "Senior Software Engineer",
            _description: "Should be well versed in a lot of stuff and a good programmer.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            _entryId: "1200"
          }
        ]
      }   
      
    //
    //members
    //
    _settings: Map<string, [SettingsEntry, SettingsValue[]]>;
    
    constructor(){
        this._settings = new Map<string, [SettingsEntry, SettingsValue[]]>();
    }

    load(jsonObj: IDataSettings, employeeId?: Id): void {

        //because we can't overload 'load' :/
        if(employeeId)
            throw "Settings Store doesn't use employeeId so this was most likely called in error"

        const entries = new Map<string, SettingsEntry>();
        const values = new Map<string, SettingsValue[]>();
        
        //load entries
        for(const jsonEntry of jsonObj["entries"]){
            const entry = SettingsEntry.fromJSON(jsonEntry);
            entries.set(entry.id.id, entry);
        }

        //load values
        for(const jsonValue of jsonObj["values"]){
            let value = null;

            if(jsonValue._description){
              value = SettingsValueWithDesc.fromJSON(jsonValue);
            }
            else {
              value = SettingsValue.fromJSON(jsonValue);
            }

            let entryValues = values.get(value.id.id);

            //if this is the first value for this entry
            if(typeof entryValues === 'undefined'){
                entryValues = [];
            }
            entryValues.push(value);
            values.set(value._entryId.id, entryValues);
        }

        //populate store
        //for each entry
        entries.forEach( (entry, key) => {
            let entryValues = values.get(entry.id.id);

            if (!entryValues)
              throw 'Internal error, values not mapped to settings entries'

            this._settings.set(key, [entry, entryValues])
        })
    }
}