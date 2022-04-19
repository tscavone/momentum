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

    constructor() {
        this._settingsStore = new SettingsStore()
        this._employeeStore = new EmployeeStore()
        this._selectedEmployeeStore = new SelectedEmployeeStore()
        this._currentDateStore = new CurrentDateStore()
        this._authedUserStore = new AuthedUserStore()
        this._noteStore = new NoteStore()
        this._stretchAnswerStore = new StretchAnswerStore()
    }

    initialize(userId: Id | string) {
        const userIdString = Id.asString(userId)
        console.log('userId string', userIdString)

        this._selectedEmployeeStore.load(TestSelectedEmployeeData[userIdString])
        console.log('store loaded', this._selectedEmployeeStore)
        this.loadTemporalObjects(userIdString)
        let userScopedSettingsTestData = {
            entries: settingsTestData['entries'],
            values: settingsTestData['values'][userIdString],
        }
        this._settingsStore.load(userScopedSettingsTestData)
        console.log('store loaded', this._settingsStore)
        this._employeeStore.load(employeeTestData[userIdString])
        console.log('store loaded', this._employeeStore)
        this._authedUserStore.load(TestAuthedUserData)
        console.log('store loaded', this._authedUserStore)

        console.log(
            'loaded stores',
            this._selectedEmployeeStore,
            this._settingsStore,
            this._employeeStore,
            this._currentDateStore,
            this._authedUserStore,
            this._noteStore,
            this._stretchAnswerStore
        )
    }

    private loadTemporalObjects(userId: string): void {
        this._noteStore.load(valueTestData[userId])
        console.log('store loaded', this._noteStore)
        this._stretchAnswerStore.load(valueTestData[userId])
        console.log('store loaded', this._stretchAnswerStore)
    }
}
