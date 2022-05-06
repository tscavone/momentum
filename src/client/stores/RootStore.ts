import { Id } from '../util/Id'
import { NoteStore } from './NoteStore'
import { SettingsStore } from './SettingsStore'
import { EmployeeStore } from './EmployeeStore'
import { SelectedEmployeeStore } from './SelectedEmployeeStore'
import { StretchAnswerStore } from './StretchAnswerStore'
import {
    employeeTestData,
    settingsTestData,
    valueTestData,
    TestSelectedEmployeeData,
    TestAuthedUserData,
} from '../../tests/testdata'
import { CurrentDateStore } from './CurrentDateStore'
import { AuthedUserStore } from './AuthedUserStore'
import { StatusAndGoalsStore } from './StatusAndGoalsStore'

//const UserData
export class RootStore {
    _settingsStore: SettingsStore
    _employeeStore: EmployeeStore
    _selectedEmployeeStore: SelectedEmployeeStore
    _currentDateStore: CurrentDateStore
    _authedUserStore: AuthedUserStore
    //Temporal Object Stores
    _noteStore: NoteStore
    _stretchAnswerStore: StretchAnswerStore
    _statusAndGoalsStore: StatusAndGoalsStore

    constructor() {
        this._settingsStore = new SettingsStore()
        this._employeeStore = new EmployeeStore()
        this._selectedEmployeeStore = new SelectedEmployeeStore()
        this._currentDateStore = new CurrentDateStore()
        this._authedUserStore = new AuthedUserStore()
        this._noteStore = new NoteStore()
        this._stretchAnswerStore = new StretchAnswerStore()
        this._statusAndGoalsStore = new StatusAndGoalsStore()
    }

    initialize(userId: Id | string) {
        const userIdString = Id.asString(userId)

        this._selectedEmployeeStore.load(TestSelectedEmployeeData[userIdString])
        this.loadTemporalObjects(userIdString)
        let userScopedSettingsTestData = {
            entries: settingsTestData['entries'],
            values: settingsTestData['values'][userIdString],
        }
        this._settingsStore.load(userScopedSettingsTestData)
        this._employeeStore.load(employeeTestData[userIdString])
        this._authedUserStore.load(TestAuthedUserData)
    }

    private loadTemporalObjects(userId: string): void {
        this._noteStore.load(valueTestData[userId])
        console.log(
            '--- NOTESTORE DATA STORE TO JSON:   ',
            JSON.stringify(this._noteStore)
        )
        this._stretchAnswerStore.load(valueTestData[userId])
        this._statusAndGoalsStore.load(valueTestData[userId])
    }
}
