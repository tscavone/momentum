import {
    employeeTestData,
    followUpTestData,
    settingsTestData,
    TestSelectedEmployeeData,
    valueTestData,
} from '../../tests/testdata'
import { IDataEmployees } from '../../shared/data_definitions/EmployeeDefinitions'
import { IDataFollowUps } from '../../shared/data_definitions/FollowUpDefinitions'
import {
    IDataMomentum,
    IDataNotes,
    IDataStatusesAndGoals,
    IDataStretchAnswers,
} from '../../shared/data_definitions/GlobalDefinitions'
import { IDataSelectedEmployee } from '../../shared/data_definitions/SelectedEmployeeDefinitions'
import { IDataSettings } from '../../shared/data_definitions/SettingsDefinitions'
import { SettingsStore } from '../stores/SettingsStore'
import { IPersistenceProvider } from './IPersistenceProvider'

export class ServerPersistenceProvider implements IPersistenceProvider {
    private _userId: string

    constructor(userId: string) {
        this._userId = userId
    }

    private collateLoadData(key: string) {
        let retval = {}
        const userTestData = valueTestData[this._userId]
        for (const employeeId in userTestData) {
            retval[employeeId] = userTestData[employeeId][key]
        }

        return retval
    }

    initDatabase(): Promise<string> {
        return Promise.reject('Method not implemented.')
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
    getSettingsData(): Promise<IDataSettings | string> {
        throw new Error('unimplemented')
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
    writeSettingsData(settingsData: IDataSettings): Promise<string> {
        console.log('\tWRITE:  << settings >> data:  ', settingsData)
        return Promise.resolve('save successful')
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
