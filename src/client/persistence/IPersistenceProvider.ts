import { IDataAllEmployees } from '../data_definitions/EmployeeDefinitions'
import {
    IDataAllEmployeeFollowUp,
    IDataFollowUp,
} from '../data_definitions/FollowUpDefinitions'
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
    getFollowUpData(): IDataAllEmployeeFollowUp
    writeNotesData(noteData: IDataNotesLoad): Promise<string>
    writeStretchData(stretchData: IDataStretchLoad): Promise<string>
    writeStatusAndGoalData(
        statusAndGoalData: IDataStatusAndGoalsLoad
    ): Promise<string>
    writeEmployeeData(employeeData: IDataAllEmployees): Promise<string>
    writeSettingsData(settingsData: IDataUserScopedSettings): Promise<string>
    writeSelectedEmployeeData(
        selectedEmployee: IDataSelectedEmployee
    ): Promise<string>
    writeFollowUpData(followUpData: IDataAllEmployeeFollowUp): Promise<string>
}
