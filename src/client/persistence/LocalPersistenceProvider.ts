import {
    employeeTestData,
    followUpTestData,
    TestSelectedEmployeeData,
    valueTestData,
} from '../../tests/testdata'
import { IDataEmployees } from '../../shared/data_definitions/EmployeeDefinitions'
import { IDataFollowUps } from '../../shared/data_definitions/FollowUpDefinitions'
import {
    IDataMomentum,
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
import { openDB, deleteDB, wrap, unwrap, IDBPDatabase } from 'idb'

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

    private collateLoadData(key: string) {
        let retval = {}
        const userTestData = valueTestData[this._userId]
        for (const employeeId in userTestData) {
            retval[employeeId] = userTestData[employeeId][key]
        }

        return retval
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

    getNotesData(): Promise<IDataNotes | string> {
        return Promise.resolve(this.collateLoadData('_notes'))
    }
    getStretchData(): Promise<IDataStretchAnswers | string> {
        return Promise.resolve(this.collateLoadData('_stretchAnswers'))
    }
    getStatusAndGoalData(): Promise<IDataStatusesAndGoals | string> {
        return Promise.resolve(this.collateLoadData('_statusAndGoals'))
    }
    getMomentumData(): Promise<IDataMomentum | string> {
        return Promise.resolve(valueTestData[this._userId])
    }
    getEmployeeData(): Promise<IDataEmployees | string> {
        return Promise.resolve(employeeTestData[this._userId])
    }
    getFollowUpData(): Promise<IDataFollowUps | string> {
        return Promise.resolve(followUpTestData[this._userId])
    }
    async getSettingsData(): Promise<IDataSettings | string> {
        const db = await this.openDatabase()

        return db
            .get(SETTINGS_STORE_NAME, this._userId)
            .then((result) => Promise.resolve(result))
            .catch((e) => Promise.reject(e))
    }
    getSelectedEmployeeData(): Promise<IDataSelectedEmployee | string> {
        return Promise.resolve(TestSelectedEmployeeData[this._userId])
    }
    writeNotesData(noteData: IDataNotes): Promise<string> {
        console.log('\tWRITE:  << note >> data:  ', noteData)
        return Promise.resolve('save successful')
    }
    writeStretchData(stretchData: IDataStretchAnswers): Promise<string> {
        console.log('\tWRITE:  << stretch >> data:  ', stretchData)
        return Promise.resolve('save successful')
    }
    writeStatusAndGoalData(
        statusAndGoalData: IDataStatusesAndGoals
    ): Promise<string> {
        console.log('\tWRITE:  << status&goal >> data:  ', statusAndGoalData)
        return Promise.resolve('save successful')
    }
    writeEmployeeData(employeeData: IDataEmployees): Promise<string> {
        console.log('\tWRITE:  << employee >> data:  ', employeeData)
        return Promise.resolve('save successful')
    }
    writeFollowUpData(followUpData: IDataFollowUps): Promise<string> {
        console.log('\tWRITE:  << Followup >> data:  ', followUpData)
        return Promise.resolve('save successful')
    }
    async writeSettingsData(settingsData: IDataSettings): Promise<string> {
        const db = await this.openDatabase()

        return db
            .put(SETTINGS_STORE_NAME, settingsData, this._userId)
            .then(() => Promise.resolve('settings saved'))
            .catch((e) => Promise.reject(e))
    }
    writeSelectedEmployeeData(
        selectedEmployee: IDataSelectedEmployee
    ): Promise<string> {
        console.log(
            '\tWRITE:  << selected Employee >>  data:  ',
            selectedEmployee
        )
        return Promise.resolve('save successful')
    }
}
