import { Id } from "../util/Id";
import { NoteStore } from "./NoteStore";
import { IDataSettings } from "../data_definitions/SettingsDefinitions";
import { IDataGlobal } from "../data_definitions/GlobalDefinitions";
import { ITemporalStore } from "./ITemporalStore";
import { IStore } from "./IStore";
import { SettingsStore } from "./SettingsStore";
import { UserStore } from "./UserStore";
import { TestUserData } from "../data_definitions/UsersDefinitions";

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
    _settingsStore: IStore
    _userStore: IStore
  
    constructor() {
      this._noteStore = new NoteStore();
      this._settingsStore = new SettingsStore();
      this._userStore = new UserStore();
    }

    initialize(){
      this.loadNotes();
      this.loadSettings();
      this.loadUsers();
    }

    private loadNotes() : void {
        for(let employeeId in valueTestData){
          
            let employeeIdTyped : Id = new Id();
            employeeIdTyped.id = employeeId;
            let thisEmployeeJsonObj = valueTestData[employeeId];
          
            this._noteStore.load(thisEmployeeJsonObj, employeeIdTyped)
        } 
    }

    private loadSettings() : void {
        this._settingsStore.load(settingsTestData);
    }    
    
    private loadUsers() : void {
        this._userStore.load(TestUserData);
    }
}
  