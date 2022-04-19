export interface IEmployeeData {
    _id: string
    _first: string
    _last: string
}

export interface IGlobalEmployeeData {
    [key: string]: {
        [key: string]: IEmployeeData
    }
}
