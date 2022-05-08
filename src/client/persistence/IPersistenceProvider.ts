import { IDataAllEmployees } from '../data_definitions/EmployeeDefinitions'
import { IDataMomentum } from '../data_definitions/GlobalDefinitions'
import { IDataSelectedEmployee } from '../data_definitions/SelectedEmployeeDefinitions'
import { IDataUserScopedSettings } from '../data_definitions/SettingsDefinitions'

export interface IPersistenceProvider {
    getMomentumData(): IDataMomentum
    getEmployeeData(): IDataAllEmployees
    getSettingsData(): IDataUserScopedSettings
    getSelectedEmployeeData(): IDataSelectedEmployee
    writeMomentumData(momentumData: IDataMomentum)
    writeEmployeeData(employeeData: IDataAllEmployees)
    writeSettingsData(settingsData: IDataUserScopedSettings)
    writeSelectedEmployeeData(selectedEmployee: IDataSelectedEmployee)
}
