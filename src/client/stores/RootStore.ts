import { Id } from '../util/Id'
import { NoteStore } from './NoteStore'
import { IDataGlobal } from '../data_definitions/GlobalDefinitions'
import { SettingsStore, settingsTestData } from './SettingsStore'
import { UserStore } from './UserStore'
import { TestUserData } from '../data_definitions/UsersDefinitions'
import { SelectedEmployeeStore } from './SelectedEmployeeStore'
import { TestSelectedEmployeeData } from '../data_definitions/SelectedEmployeeDefinitions'
import { StretchAnswerStore } from './StretchAnswerStore'
const valueTestData: IDataGlobal = {
    '1234': {
        _notes: {
            _current: { _id: '8888a', _text: 'Here is a current one' },
            _temporalObjects: [
                {
                    _obj: { _id: '8888b', _text: 'Here is the first' },
                    _date: '02/01/2022',
                },
                {
                    _obj: { _id: '8888c', _text: 'Here is the second' },
                    _date: '03/01/2022',
                },
            ],
        },
        _stretchAnswers: {
            _current: {
                _id: '9999a',
                _answer: 'I try really really hard to figure it out',
                _question: '1300-10',
            },
            _temporalObjects: [
                {
                    _obj: {
                        _id: '9999b',
                        _answer: 'Games, I love games',
                        _question: '1300-20',
                    },
                    _date: '02/01/2022',
                },
            ],
        },
    },
    '2345': {
        _notes: {
            _current: { _id: '8888z', _text: 'USER2 - Here is a current one' },
            _temporalObjects: [
                {
                    _obj: { _id: '8888l', _text: 'USER2 - Here is the first' },
                    _date: '02/02/2022',
                },
                {
                    _obj: { _id: '8888g', _text: 'USER2 -Here is the second' },
                    _date: '03/02/2022',
                },
            ],
        },
        _stretchAnswers: {
            _current: {
                _id: '9999a',
                _answer: 'I wrote an app to help my mom with her business',
                _question: '1300-20',
            },
            _temporalObjects: [
                {
                    _obj: {
                        _id: '9999b',
                        _answer: 'No, it sounds horrible!',
                        _question: '1300-30',
                    },
                    _date: '02/01/2022',
                },
            ],
        },
    },
}

//const UserData
export class RootStore {
    _settingsStore: SettingsStore
    _userStore: UserStore
    _selectedEmployeeStore: SelectedEmployeeStore
    //Temporal Object Stores
    _noteStore: NoteStore
    _stretchAnswerStore: StretchAnswerStore

    constructor() {
        this._settingsStore = new SettingsStore()
        this._userStore = new UserStore()
        this._selectedEmployeeStore = new SelectedEmployeeStore()
        this._noteStore = new NoteStore()
        this._stretchAnswerStore = new StretchAnswerStore()
    }

    initialize() {
        this._settingsStore.load(settingsTestData)
        this._userStore.load(TestUserData)
        this._selectedEmployeeStore.load(TestSelectedEmployeeData)
        this.loadTemporalObjects()
    }

    private loadTemporalObjects(): void {
        for (let employeeId in valueTestData) {
            let employeeIdTyped: Id = new Id()
            employeeIdTyped.id = employeeId
            let thisEmployeeJsonObj = valueTestData[employeeId]

            this._noteStore.load(thisEmployeeJsonObj._notes, employeeIdTyped)
            this._stretchAnswerStore.load(
                thisEmployeeJsonObj._stretchAnswers,
                employeeIdTyped
            )
        }
    }
}
