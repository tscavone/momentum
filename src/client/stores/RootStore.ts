import { Id } from '../util/Id'
import { NoteStore } from './NoteStore'
import { SettingsStore } from './SettingsStore'
import { UserStore } from './UserStore'
import { SelectedEmployeeStore } from './SelectedEmployeeStore'
import { TestSelectedEmployeeData } from '../data_definitions/SelectedEmployeeDefinitions'
import { StretchAnswerStore } from './StretchAnswerStore'
import {
    employeeTestData,
    settingsTestData,
    valueTestData,
} from '../../test/testdata'

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
        this._settingsStore.loadEmployee(settingsTestData)
        this._userStore.loadEmployee(employeeTestData)
        this._selectedEmployeeStore.loadEmployee(TestSelectedEmployeeData)
        this.loadTemporalObjects()
    }

    private loadTemporalObjects(): void {
        for (let employeeId in valueTestData) {
            let employeeIdTyped: Id = new Id()
            employeeIdTyped.id = employeeId
            let thisEmployeeJsonObj = valueTestData[employeeId]

            this._noteStore.loadEmployee(
                thisEmployeeJsonObj._notes,
                employeeIdTyped
            )
            this._stretchAnswerStore.loadEmployee(
                thisEmployeeJsonObj._stretchAnswers,
                employeeIdTyped
            )
        }
    }
}
