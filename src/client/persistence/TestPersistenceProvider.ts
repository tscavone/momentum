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
import { Id } from '../util/Id'
import { IPersistenceProvider } from './IPersistenceProvider'

export class TestPersistenceProvider implements IPersistenceProvider {
    private _userId: Id

    constructor(userId: Id) {
        this._userId = userId
    }

    getMomentumData(): IDataMomentum {
        return valueTestData[this._userId.id]
    }
    getEmployeeData(): IDataAllEmployees {
        return employeeTestData[this._userId.id]
    }
    getSettingsData(): IDataUserScopedSettings {
        return {
            entries: settingsTestData['entries'],
            values: settingsTestData['values'][this._userId.id],
        }
    }
    getSelectedEmployeeData(): IDataSelectedEmployee {
        return TestSelectedEmployeeData[this._userId.id]
    }
    writeMomentumData(IDataGlobal: any) {
        throw new Error('Method not implemented.')
    }
    writeEmployeeData(IDataEmployeeDetails: any) {
        throw new Error('Method not implemented.')
    }
    writeSettingsData(IDataSettings: any) {
        throw new Error('Method not implemented.')
    }
    writeSelectedEmployeeData(IDataSelectedEmployee: any) {
        throw new Error('Method not implemented.')
    }
}
