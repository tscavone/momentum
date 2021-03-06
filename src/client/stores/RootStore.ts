import { Id } from '../util/Id'
import { NoteStore } from './NoteStore'
import { SettingsStore } from './SettingsStore'
import { EmployeeStore } from './EmployeeStore'
import { SelectedEmployeeStore } from './SelectedEmployeeStore'
import { StretchAnswerStore } from './StretchAnswerStore'
import { CurrentDateStore } from './CurrentDateStore'
import { AuthedUserStore } from './AuthedUserStore'
import { StatusAndGoalsStore } from './StatusAndGoalsStore'
import { FollowUpStore } from './FollowUpStore'
import { PersistenceProviderFactory } from '../persistence/PersistenceProviderFactory'
import { makeAutoObservable } from 'mobx'

//const UserData
export class RootStore {
    _settingsStore: SettingsStore
    _employeeStore: EmployeeStore
    _selectedEmployeeStore: SelectedEmployeeStore
    _currentDateStore: CurrentDateStore
    _authedUserStore: AuthedUserStore
    _followUpStore: FollowUpStore
    //Temporal Object Stores
    _noteStore: NoteStore
    _stretchAnswerStore: StretchAnswerStore
    _statusAndGoalsStore: StatusAndGoalsStore
    private _loaded: boolean

    constructor() {
        makeAutoObservable(this)
        this._authedUserStore = new AuthedUserStore()
        this._currentDateStore = new CurrentDateStore()
        this._selectedEmployeeStore = new SelectedEmployeeStore()
        this._settingsStore = new SettingsStore()
        this._employeeStore = new EmployeeStore()
        this._noteStore = new NoteStore()
        this._stretchAnswerStore = new StretchAnswerStore()
        this._statusAndGoalsStore = new StatusAndGoalsStore()
        this._followUpStore = new FollowUpStore()
        this._loaded = false
    }

    initializeNewUser(storage: string): Promise<string> {
        return this._settingsStore.initializeNewUser(storage)
    }

    initialize(userId: Id | string, storage: string) {
        const userIdString = Id.asString(userId)

        const persistenceProvider =
            PersistenceProviderFactory.getPersistenceProvider(
                userIdString,
                storage
            )

        this._selectedEmployeeStore.persistenceProvider = persistenceProvider
        this._settingsStore.persistenceProvider = persistenceProvider
        this._employeeStore.persistenceProvider = persistenceProvider
        this._noteStore.persistenceProvider = persistenceProvider
        this._stretchAnswerStore.persistenceProvider = persistenceProvider
        this._statusAndGoalsStore.persistenceProvider = persistenceProvider
        this._followUpStore.persistenceProvider = persistenceProvider
    }
    public get loaded(): boolean {
        return this._loaded
    }
    public set loaded(value: boolean) {
        this._loaded = value
    }
    async loadData() {
        await this._settingsStore.load()
        await this._selectedEmployeeStore.load()
        await this.loadTemporalObjects()
        await this._followUpStore.load()
        await this._employeeStore.load()
        this.loaded = true
    }

    private async loadTemporalObjects() {
        await this._noteStore.load()
        await this._stretchAnswerStore.load()
        await this._statusAndGoalsStore.load()
    }
}
