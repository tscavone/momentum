import { IDataIdentifiedObject } from './GlobalDefinitions'

export interface IDataEmployee extends IDataIdentifiedObject {
    _first: string
    _last: string
    _email: string
    _startDate: string
    _position: string // settings entry id
    _skills: string[] // settings entry ids
    _interests: string[]
    _college: string
    _hometown: string
    _townOfResidence: string
    _birthMonthDay: string
    _pets: string[]
    _additionalDetails: string
}

export interface IDataEmployees {
    [key: string]: IDataEmployee
}

//used in testing
export interface IDataEmployeeDetails {
    [key: string]: {
        [key: string]: IDataEmployee
    }
}
