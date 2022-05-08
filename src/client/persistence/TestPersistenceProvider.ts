import {
    employeeTestData,
    settingsTestData,
    TestSelectedEmployeeData,
    valueTestData,
} from '../../tests/testdata'
import { IDataAllEmployees } from '../data_definitions/EmployeeDefinitions'
import { IDataMomentum } from '../data_definitions/GlobalDefinitions'
import { IDataSelectedEmployee } from '../data_definitions/SelectedEmployeeDefinitions'
import { IDataUserScopedSettings } from '../data_definitions/SettingsDefinitions'
import { IPersistenceProvider } from './IPersistenceProvider'

export class TestPersistenceProvider implements IPersistenceProvider {
    private _userId: string

    constructor(userId: string) {
        this._userId = userId
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
    writeMomentumData(momentumData: IDataMomentum) {
        console.log('\tWRITE:  << momentum >> data:  ', momentumData)
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
