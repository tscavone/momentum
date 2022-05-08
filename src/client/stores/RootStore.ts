import { Id } from '../util/Id'
import { NoteStore } from './NoteStore'
import { SettingsStore } from './SettingsStore'
import { EmployeeStore } from './EmployeeStore'
import { SelectedEmployeeStore } from './SelectedEmployeeStore'
import { StretchAnswerStore } from './StretchAnswerStore'
import { settingsTestData, TestAuthedUserData } from '../../tests/testdata'
import { CurrentDateStore } from './CurrentDateStore'
import { AuthedUserStore } from './AuthedUserStore'
import { StatusAndGoalsStore } from './StatusAndGoalsStore'
import { IPersistenceProvider } from '../persistence/IPersistenceProvider'
import { PersistenceProviderFactory } from '../persistence/PersistenceProviderFactory'

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

    _persistenceProvider: IPersistenceProvider

    constructor() {
        this._settingsStore = new SettingsStore()
        this._employeeStore = new EmployeeStore()
        this._selectedEmployeeStore = new SelectedEmployeeStore()
        this._currentDateStore = new CurrentDateStore()
        this._authedUserStore = new AuthedUserStore()
        this._noteStore = new NoteStore()
        this._stretchAnswerStore = new StretchAnswerStore()
        this._statusAndGoalsStore = new StatusAndGoalsStore()

        this._persistenceProvider = null
    }

    initialize(userId: Id | string) {
        const userIdString = Id.asString(userId)

        this._persistenceProvider =
            PersistenceProviderFactory.getPersistenceProvider(
                userIdString,
                this._settingsStore
            )

        this._selectedEmployeeStore.load(
            this._persistenceProvider.getSelectedEmployeeData()
        )
        this.loadTemporalObjects()
        let userScopedSettingsTestData = {
            entries: settingsTestData['entries'],
            values: settingsTestData['values'][userIdString],
        }
        this._settingsStore.load(this._persistenceProvider.getSettingsData())
        this._employeeStore.load(this._persistenceProvider.getEmployeeData())
        this._authedUserStore.load(TestAuthedUserData)
    }

    private loadTemporalObjects(): void {
        const momentumData = this._persistenceProvider.getMomentumData()
        this._noteStore.load(momentumData)
        this._stretchAnswerStore.load(momentumData)
        this._statusAndGoalsStore.load(momentumData)
    }
}
