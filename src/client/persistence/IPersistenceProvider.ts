import { IDataAllEmployees } from '../../shared/data_definitions/EmployeeDefinitions'
import { IDataAllEmployeeFollowUp } from '../../shared/data_definitions/FollowUpDefinitions'
import {
    IDataNotesLoad,
    IDataStatusAndGoalsLoad,
    IDataStretchLoad,
} from '../../shared/data_definitions/GlobalDefinitions'
import { IDataSelectedEmployee } from '../../shared/data_definitions/SelectedEmployeeDefinitions'
import { IDataUserScopedSettings } from '../../shared/data_definitions/SettingsDefinitions'

export interface IPersistenceProvider {
    createNewUser(
        username: string,
        password: string,
        first: string,
        last: string,
        moniker: string
    ): Promise<string>
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
