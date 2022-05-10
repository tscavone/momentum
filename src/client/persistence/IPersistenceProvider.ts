import { IDataAllEmployees } from '../data_definitions/EmployeeDefinitions'
import {
    IDataNotesLoad,
    IDataStatusAndGoalsLoad,
    IDataStretchLoad,
} from '../data_definitions/GlobalDefinitions'
import { IDataSelectedEmployee } from '../data_definitions/SelectedEmployeeDefinitions'
import { IDataUserScopedSettings } from '../data_definitions/SettingsDefinitions'

export interface IPersistenceProvider {
    getEmployeeData(): IDataAllEmployees
    getSettingsData(): IDataUserScopedSettings
    getSelectedEmployeeData(): IDataSelectedEmployee
    getNotesData(): IDataNotesLoad
    getStretchData(): IDataStretchLoad
    getStatusAndGoalData(): IDataStatusAndGoalsLoad
    writeNotesData(noteData: IDataNotesLoad)
    writeStretchData(stretchData: IDataStretchLoad)
    writeStatusAndGoalData(statusAndGoalData: IDataStatusAndGoalsLoad)
    writeEmployeeData(employeeData: IDataAllEmployees)
    writeSettingsData(settingsData: IDataUserScopedSettings)
    writeSelectedEmployeeData(selectedEmployee: IDataSelectedEmployee)
}
