import { IDataIdentifiedObject } from './GlobalDefinitions'

export interface IDataAuthedUser {
    _userId: string
    _token: string
}

export interface IDataUser extends IDataIdentifiedObject {
    username: string
    password: string
    first: string
    last: string
    email: string
    created?: string
    updated?: string
    deleted?: string
}
