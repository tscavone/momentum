import { IDataIdentifiedObject } from './GlobalDefinitions'

export interface IDataFollowUp extends IDataIdentifiedObject {
    _text: string
    _resolvedDate: string
}

export interface IDataAllEmployeeFollowUps {
    [key: string]: IDataFollowUp[]
}
