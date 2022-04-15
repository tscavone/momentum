import { Id } from '../util/Id'
import { NoteStore } from './NoteStore'
import { SettingsStore } from './SettingsStore'
import { EmployeeStore } from './EmployeeStore'
import { SelectedEmployeeStore } from './SelectedEmployeeStore'
import { TestSelectedEmployeeData } from '../data_definitions/SelectedEmployeeDefinitions'
import { StretchAnswerStore } from './StretchAnswerStore'
import {
    employeeTestData,
    settingsTestData,
    valueTestData,
} from '../../tests/testdata'
import { CurrentDateStore } from './CurrentDateStore'

//const UserData
export class RootStore {
    _settingsStore: SettingsStore
    _employeeStore: EmployeeStore
    _selectedEmployeeStore: SelectedEmployeeStore
    _currentDateStore: CurrentDateStore
    //Temporal Object Stores
    _noteStore: NoteStore
    _stretchAnswerStore: StretchAnswerStore

    constructor() {
        this._settingsStore = new SettingsStore()
        this._employeeStore = new EmployeeStore()
        this._selectedEmployeeStore = new SelectedEmployeeStore()
        this._currentDateStore = new CurrentDateStore()
        this._noteStore = new NoteStore()
        this._stretchAnswerStore = new StretchAnswerStore()
    }

    initialize(userId: Id | string) {
        const userIdString = Id.asString(userId)

        let userScopedSettingsTestData = {
            entries: settingsTestData['entries'],
            values: settingsTestData['values'][userIdString],
        }
        this._settingsStore.load(userScopedSettingsTestData)
        this._employeeStore.load(employeeTestData)
        this._selectedEmployeeStore.load(TestSelectedEmployeeData)
        this.loadTemporalObjects(userIdString)
    }

    private loadTemporalObjects(userId: string): void {
        this._noteStore.load(valueTestData[userId])
        this._stretchAnswerStore.load(valueTestData[userId])
    }
}
