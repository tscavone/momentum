import {
    IDataAllEmployees,
    IDataEmployeeDetails,
} from '../data_definitions/EmployeeDefinitions'
import { IDataMomentum } from '../data_definitions/GlobalDefinitions'
import { IDataSelectedEmployee } from '../data_definitions/SelectedEmployeeDefinitions'
import {
    IDataSettings,
    IDataUserScopedSettings,
} from '../data_definitions/SettingsDefinitions'

export interface IPersistenceProvider {
    getMomentumData(): IDataMomentum
    getEmployeeData(): IDataAllEmployees
    getSettingsData(): IDataUserScopedSettings
    getSelectedEmployeeData(): IDataSelectedEmployee
    writeMomentumData(IDataGlobal)
    writeEmployeeData(IDataEmployeeDetails)
    writeSettingsData(IDataSettings)
    writeSelectedEmployeeData(IDataSelectedEmployee)
}
