import {
    employeeTestData,
    followUpTestData,
    settingsTestData,
    TestSelectedEmployeeData,
    valueTestData,
} from '../../tests/testdata'
import { IDataAllEmployees } from '../../shared/data_definitions/EmployeeDefinitions'
import { IDataAllEmployeeFollowUp } from '../../shared/data_definitions/FollowUpDefinitions'
import {
    IDataMomentum,
    IDataNotesLoad,
    IDataStatusAndGoalsLoad,
    IDataStretchLoad,
} from '../../shared/data_definitions/GlobalDefinitions'
import { IDataSelectedEmployee } from '../../shared/data_definitions/SelectedEmployeeDefinitions'
import { IDataUserScopedSettings } from '../../shared/data_definitions/SettingsDefinitions'
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

    createNewUser(
        username: string,
        password: string,
        first: string,
        last: string,
        moniker: string
    ): Promise<string> {
        console.log("New test user 'created'")
        return Promise.resolve('user created')
    }
    getNotesData(): Promise<IDataNotesLoad | string> {
        return Promise.resolve(this.collateLoadData('_notes'))
    }
    getStretchData(): Promise<IDataStretchLoad | string> {
        return Promise.resolve(this.collateLoadData('_stretchAnswers'))
    }
    getStatusAndGoalData(): Promise<IDataStatusAndGoalsLoad | string> {
        return Promise.resolve(this.collateLoadData('_statusAndGoals'))
    }
    getMomentumData(): Promise<IDataMomentum | string> {
        return Promise.resolve(valueTestData[this._userId])
    }
    getEmployeeData(): Promise<IDataAllEmployees | string> {
        return Promise.resolve(employeeTestData[this._userId])
    }
    getFollowUpData(): Promise<IDataAllEmployeeFollowUp | string> {
        return Promise.resolve(followUpTestData[this._userId])
    }
    getSettingsData(): Promise<IDataUserScopedSettings | string> {
        let values = settingsTestData['values'][this._userId]

        if (!values) {
            values = SettingsStore.getDefaultValues()
        }
        return Promise.resolve({
            entries: settingsTestData['entries'],
            values,
        })
    }
    getSelectedEmployeeData(): Promise<IDataSelectedEmployee | string> {
        return Promise.resolve(TestSelectedEmployeeData[this._userId])
    }
    writeNotesData(noteData: IDataNotesLoad) {
        console.log('\tWRITE:  << note >> data:  ', noteData)
        return Promise.resolve('save successful')
    }
    writeStretchData(stretchData: IDataStretchLoad) {
        console.log('\tWRITE:  << stretch >> data:  ', stretchData)
        return Promise.resolve('save successful')
    }
    writeStatusAndGoalData(statusAndGoalData: IDataStatusAndGoalsLoad) {
        console.log('\tWRITE:  << status&goal >> data:  ', statusAndGoalData)
        return Promise.resolve('save successful')
    }
    writeEmployeeData(employeeData: IDataAllEmployees) {
        console.log('\tWRITE:  << employee >> data:  ', employeeData)
        return Promise.resolve('save successful')
    }
    writeFollowUpData(followUpData: IDataAllEmployeeFollowUp) {
        console.log('\tWRITE:  << Followup >> data:  ', followUpData)
        return Promise.resolve('save successful')
    }
    writeSettingsData(settingsData: IDataUserScopedSettings) {
        console.log('\tWRITE:  << settings >> data:  ', settingsData)
        return Promise.resolve('save successful')
    }
    writeSelectedEmployeeData(selectedEmployee: IDataSelectedEmployee) {
        console.log(
            '\tWRITE:  << selected Employee >>  data:  ',
            selectedEmployee
        )
        return Promise.resolve('save successful')
    }
}
