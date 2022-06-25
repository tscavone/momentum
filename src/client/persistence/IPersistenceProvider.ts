import { IDataEmployees } from '../../shared/data_definitions/EmployeeDefinitions'
import { IDataFollowUps } from '../../shared/data_definitions/FollowUpDefinitions'
import {
    IDataNotes,
    IDataStatusesAndGoals,
    IDataStretchAnswers,
} from '../../shared/data_definitions/GlobalDefinitions'
import { IDataSelectedEmployee } from '../../shared/data_definitions/SelectedEmployeeDefinitions'
import { IDataSettings } from '../../shared/data_definitions/SettingsDefinitions'

export interface IPersistenceProvider {
    initDatabase(): Promise<string>
    getEmployeeData(): Promise<IDataEmployees | string>
    getSettingsData(): Promise<IDataSettings | string>
    getSelectedEmployeeData(): Promise<IDataSelectedEmployee | string>
    getNotesData(): Promise<IDataNotes | string>
    getStretchData(): Promise<IDataStretchAnswers | string>
    getStatusAndGoalData(): Promise<IDataStatusesAndGoals | string>
    getFollowUpData(): Promise<IDataFollowUps | string>
    writeNotesData(noteData: IDataNotes): Promise<string>
    writeStretchData(stretchData: IDataStretchAnswers): Promise<string>
    writeStatusAndGoalData(
        statusAndGoalData: IDataStatusesAndGoals
    ): Promise<string>
    writeEmployeeData(employeeData: IDataEmployees): Promise<string>
    writeSettingsData(settingsData: IDataSettings): Promise<string>
    writeSelectedEmployeeData(
        selectedEmployee: IDataSelectedEmployee
    ): Promise<string>
    writeFollowUpData(followUpData: IDataFollowUps): Promise<string>
}
