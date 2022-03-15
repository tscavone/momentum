export interface IUserData {
    _id: string
    _first: string
    _last: string
}

export interface IGlobalUserData {
    [key: string]: IUserData
}

export const TestUserData: IGlobalUserData = {
    '1234': {
        _id: '1234',
        _first: 'Tom',
        _last: 'Waits',
    },
    '2345': {
        _id: '2345',
        _first: 'Brandon',
        _last: 'Flowers',
    },
}
