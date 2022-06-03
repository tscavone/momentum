export interface IDataAuthedUser {
    _userId: string
    _token: string
}

export interface IDataUser {
    first: string
    last: string
    username: string
    passwordHash: string
}
