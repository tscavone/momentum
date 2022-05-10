import { Id } from '../util/Id'
import { NoteStore } from './NoteStore'
import { SettingsStore } from './SettingsStore'
import { EmployeeStore } from './EmployeeStore'
import { SelectedEmployeeStore } from './SelectedEmployeeStore'
import { StretchAnswerStore } from './StretchAnswerStore'
import { CurrentDateStore } from './CurrentDateStore'
import { AuthedUserStore } from './AuthedUserStore'
import { StatusAndGoalsStore } from './StatusAndGoalsStore'
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

    constructor() {
        this._authedUserStore = new AuthedUserStore()
        this._currentDateStore = new CurrentDateStore()
        this._selectedEmployeeStore = new SelectedEmployeeStore()
        this._settingsStore = new SettingsStore()
        this._employeeStore = new EmployeeStore()
        this._noteStore = new NoteStore()
        this._stretchAnswerStore = new StretchAnswerStore()
        this._statusAndGoalsStore = new StatusAndGoalsStore()
    }

    initialize(userId: Id | string) {
        const userIdString = Id.asString(userId)

        const persistenceProvider =
            PersistenceProviderFactory.getPersistenceProvider(
                userIdString,
                this._settingsStore
            )

        this._selectedEmployeeStore.persistenceProvider = persistenceProvider
        this._settingsStore.persistenceProvider = persistenceProvider
        this._employeeStore.persistenceProvider = persistenceProvider
        this._noteStore.persistenceProvider = persistenceProvider
        this._stretchAnswerStore.persistenceProvider = persistenceProvider
        this._statusAndGoalsStore.persistenceProvider = persistenceProvider

        this._selectedEmployeeStore.load()
        this.loadTemporalObjects()
        this._settingsStore.load()
        this._employeeStore.load()
    }

    private loadTemporalObjects(): void {
        this._noteStore.load()
        this._stretchAnswerStore.load()
        this._statusAndGoalsStore.load()
    }
}
