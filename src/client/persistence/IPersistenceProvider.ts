import { IGlobalEmployeeData } from '../data_definitions/EmployeeDefinitions'
import { IDataGlobal } from '../data_definitions/GlobalDefinitions'
import { IDataSettings } from '../data_definitions/SettingsDefinitions'

export interface IPersistenceProvider {
    getMomentumData(): IDataGlobal
    getEmployeeData(): IGlobalEmployeeData
    getSettingsData(): IDataSettings
}
