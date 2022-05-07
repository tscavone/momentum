export interface IDataEmployee {
    _id: string
    _first: string
    _last: string
}

export interface IDataEmployeeDetails {
    [key: string]: {
        [key: string]: IDataEmployee
    }
}

export interface IDataAllEmployees {
    [key: string]: IDataEmployee
}
