import { IDataEmployees } from '../../shared/data_definitions/EmployeeDefinitions'
import { IDataFollowUps } from '../../shared/data_definitions/FollowUpDefinitions'
import {
    IDataNotes,
    IDataStatusAndGoals,
    IDataStatusesAndGoals,
    IDataStretchAnswers,
} from '../../shared/data_definitions/GlobalDefinitions'
import {
    IDataSelectedEmployee,
    IDataSelectedEmployees,
} from '../../shared/data_definitions/SelectedEmployeeDefinitions'
import { IDataSettings } from '../../shared/data_definitions/SettingsDefinitions'
import { IPersistenceProvider } from './IPersistenceProvider'
import { openDB, IDBPDatabase } from 'idb'

const NOTES_STORE_NAME = 'notes'
const STRETCH_STORE_NAME = 'stretch'
const STATUS_STORE_NAME = 'status'
const FOLLOWUPS_STORE_NAME = 'followups'
const SELECTED_EMPLOYEE_STORE_NAME = 'selected'
const EMPLOYEE_STORE_NAME = 'employees'
const SETTINGS_STORE_NAME = 'settings'

interface momentumDB {
    NOTES_STORE_NAME: {
        key: string
        value: IDataNotes
    }
    STRETCH_STORE_NAME: {
        key: string
        value: IDataStretchAnswers
    }
    STATUS_STORE_NAME: {
        key: string
        value: IDataStatusAndGoals
    }
    FOLLOWUPS_STORE_NAME: {
        key: string
        value: IDataFollowUps
    }
    SELECTED_EMPLOYEE_STORE_NAME: {
        key: string
        value: IDataSelectedEmployees
    }
    EMPLOYEE_STORE_NAME: {
        key: string
        value: IDataEmployees
    }
    SETTINGS_STORE_NAME: {
        key: string
        value: IDataSettings
    }
}

export class LocalPersistenceProvider implements IPersistenceProvider {
    private _userId: string
    private _DBNAME: string
    private _DBVERSION: number

    constructor(userId: string) {
        this._userId = userId
        this._DBNAME = 'momentum'
        this._DBVERSION = 1
    }

    async openDatabase(): Promise<IDBPDatabase<momentumDB>> {
        return openDB<momentumDB>(this._DBNAME, this._DBVERSION, {
            upgrade(db) {
                db.createObjectStore(NOTES_STORE_NAME)
                db.createObjectStore(STRETCH_STORE_NAME)
                db.createObjectStore(STATUS_STORE_NAME)
                db.createObjectStore(FOLLOWUPS_STORE_NAME)
                db.createObjectStore(SELECTED_EMPLOYEE_STORE_NAME)
                db.createObjectStore(EMPLOYEE_STORE_NAME)
                db.createObjectStore(SETTINGS_STORE_NAME)
            },
        })
    }

    async initDatabase(): Promise<string> {
        return this.openDatabase()
            .then(() => Promise.resolve('indexeddb initialized'))
            .catch((e) => Promise.reject(e))
    }

    private async writeData(
        storeName: string,
        data: object,
        successMessage: string
    ): Promise<string> {
        const db = await this.openDatabase()

        return db
            .put(storeName, data, this._userId)
            .then(() => Promise.resolve(successMessage))
            .catch((e) => Promise.reject(e))
    }

    private async readData(storeName: string): Promise<object> {
        const db = await this.openDatabase()

        return db
            .get(storeName, this._userId)
            .then((result) => Promise.resolve(result))
            .catch((e) => Promise.reject(e))
    }

    getNotesData(): Promise<IDataNotes> {
        return this.readData(NOTES_STORE_NAME) as Promise<IDataNotes>
    }
    getStretchData(): Promise<IDataStretchAnswers> {
        return this.readData(STRETCH_STORE_NAME) as Promise<IDataStretchAnswers>
    }
    getStatusAndGoalData(): Promise<IDataStatusesAndGoals> {
        return this.readData(
            STATUS_STORE_NAME
        ) as Promise<IDataStatusesAndGoals>
    }
    getEmployeeData(): Promise<IDataEmployees> {
        return this.readData(EMPLOYEE_STORE_NAME) as Promise<IDataEmployees>
    }
    getFollowUpData(): Promise<IDataFollowUps> {
        return this.readData(FOLLOWUPS_STORE_NAME) as Promise<IDataFollowUps>
    }
    async getSettingsData(): Promise<IDataSettings> {
        return this.readData(SETTINGS_STORE_NAME) as Promise<IDataSettings>
    }
    getSelectedEmployeeData(): Promise<IDataSelectedEmployee> {
        return this.readData(
            SELECTED_EMPLOYEE_STORE_NAME
        ) as Promise<IDataSelectedEmployee>
    }
    writeNotesData(noteData: IDataNotes): Promise<string> {
        return this.writeData(NOTES_STORE_NAME, noteData, 'notes data saved')
    }
    writeStretchData(stretchData: IDataStretchAnswers): Promise<string> {
        return this.writeData(
            STRETCH_STORE_NAME,
            stretchData,
            'stretch data saved'
        )
    }
    writeStatusAndGoalData(
        statusAndGoalData: IDataStatusesAndGoals
    ): Promise<string> {
        return this.writeData(
            STATUS_STORE_NAME,
            statusAndGoalData,
            'status and goals saved'
        )
    }
    writeEmployeeData(employeeData: IDataEmployees): Promise<string> {
        return this.writeData(
            EMPLOYEE_STORE_NAME,
            employeeData,
            'employee data saved'
        )
    }
    writeFollowUpData(followUpData: IDataFollowUps): Promise<string> {
        return this.writeData(
            FOLLOWUPS_STORE_NAME,
            followUpData,
            'follow ups saved'
        )
    }
    writeSettingsData(settingsData: IDataSettings): Promise<string> {
        return this.writeData(
            SETTINGS_STORE_NAME,
            settingsData,
            'settings saved'
        )
    }
    writeSelectedEmployeeData(
        selectedEmployee: IDataSelectedEmployee
    ): Promise<string> {
        return this.writeData(
            SELECTED_EMPLOYEE_STORE_NAME,
            selectedEmployee,
            'selected employee saved'
        )
    }
}
