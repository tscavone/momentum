import { IDataIdentifiedObject } from './GlobalDefinitions'

export interface IDataFollowUp extends IDataIdentifiedObject {
    _text: string
    _resolvedDate: string
}

export interface IDataFollowUps {
    [key: string]: IDataFollowUp[]
}

//used in testing
export interface IDataFollowUpAllUsers {
    [key: string]: IDataFollowUps
}
