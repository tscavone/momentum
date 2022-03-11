import { Id } from "../util/Id";
import { NoteStore } from "./NoteStore";
import { IDataSettings } from "../data_definitions/SettingsDefinitions";
import { IDataGlobal } from "../data_definitions/GlobalDefinitions";
import { ITemporalStore } from "./ITemporalStore";

const settingsTestData : IDataSettings = {
  "entries":[
    {
      _id: "1200",
      _name: "Position",
      _description: "An employment-level for software engineers"
    }
  ],
  "values":[
      { _entryId: "1200",
        _id: "1200-10",
        _name: "Associate Software Engineer",
        _description: "Somebody just starting out. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
      },
      { _entryId: "1200",
        _id: "1200-20",
        _name: "Software Engineer",
        _description: "Somebody who has been at it for a while. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
      },
      { _entryId: "1200",
        _id: "1200-30",
        _name: "Senior Software Engineer",
        _description: "Should be well versed in a lot of stuff and a good programmer.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      }
  ]
}

const valueTestData : IDataGlobal = {
    "1234": {
      _notes: {
        _current: { _text: "Here is a current one" },
        _temporalObjects: [{
          _obj: { _text: "Here is the first" },
          _date: "02/01/2022"
        },
        {
          _obj: { _text: "Here is the second" },
          _date: "03/01/2022"
        }
        ]
      }
    },
    "2345": {
      _notes: {
        _current: { _text: "USER2 - Here is a current one" },
        _temporalObjects: [{
          _obj: { _text: "USER2 - Here is the first" },
          _date: "02/02/2022"
        },
        {
          _obj: { _text: "USER2 -Here is the second" },
          _date: "03/02/2022"
        }
        ]
      }
    }
  };

//const UserData
export class RootStore {
    _noteStore: ITemporalStore
  
    constructor() {
        this._noteStore = new NoteStore()
    }

    initialize(){
        for(const id in valueTestData){
            this.load(this._noteStore, valueTestData, id)
        }    
    }

    load(store: ITemporalStore, jsonObj: any, employeeId?: string) : void {
        console.log("Load Called")
      
        let employeeIdTyped : Id = new Id();
        employeeId = employeeId ? employeeId : "";
        employeeIdTyped.id = employeeId;
        let thisEmployeeJsonObj = jsonObj[employeeId];
      
        store.load(thisEmployeeJsonObj, employeeIdTyped)
    }
  }
  