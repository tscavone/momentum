import {
    employeeTestData,
    settingsTestData,
    TestSelectedEmployeeData,
    valueTestData,
} from '../../tests/testdata'
import { IDataAllEmployees } from '../data_definitions/EmployeeDefinitions'
import {
    IDataMomentum,
    IDataNotesLoad,
    IDataStatusAndGoalsLoad,
    IDataStretchLoad,
} from '../data_definitions/GlobalDefinitions'
import { IDataSelectedEmployee } from '../data_definitions/SelectedEmployeeDefinitions'
import { IDataUserScopedSettings } from '../data_definitions/SettingsDefinitions'
import { IPersistenceProvider } from './IPersistenceProvider'

export class TestPersistenceProvider implements IPersistenceProvider {
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

    getNotesData(): IDataNotesLoad {
        return this.collateLoadData('_notes')
    }
    getStretchData(): IDataStretchLoad {
        return this.collateLoadData('_stretchAnswers')
    }
    getStatusAndGoalData(): IDataStatusAndGoalsLoad {
        return this.collateLoadData('_statusAndGoals')
    }
    getMomentumData(): IDataMomentum {
        return valueTestData[this._userId]
    }
    getEmployeeData(): IDataAllEmployees {
        return employeeTestData[this._userId]
    }
    getSettingsData(): IDataUserScopedSettings {
        return {
            entries: settingsTestData['entries'],
            values: settingsTestData['values'][this._userId],
        }
    }
    getSelectedEmployeeData(): IDataSelectedEmployee {
        return TestSelectedEmployeeData[this._userId]
    }
    writeNotesData(noteData: IDataNotesLoad) {
        console.log('\tWRITE:  << note >> data:  ', noteData)
    }
    writeStretchData(stretchData: IDataStretchLoad) {
        console.log('\tWRITE:  << stretch >> data:  ', stretchData)
    }
    writeStatusAndGoalData(statusAndGoalData: IDataStatusAndGoalsLoad) {
        console.log('\tWRITE:  << status&goal >> data:  ', statusAndGoalData)
    }
    writeEmployeeData(employeeData: IDataAllEmployees) {
        console.log('\tWRITE:  << employee >> data:  ', employeeData)
    }
    writeSettingsData(settingsData: IDataUserScopedSettings) {
        console.log('\tWRITE:  << settings >> data:  ', settingsData)
    }
    writeSelectedEmployeeData(selectedEmployee: IDataSelectedEmployee) {
        console.log(
            '\tWRITE:  << selected Employee >>  data:  ',
            selectedEmployee
        )
    }
}
