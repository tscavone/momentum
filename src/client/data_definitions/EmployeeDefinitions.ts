export interface IDataEmployee {
    _id: string
    _first: string
    _last: string
}

export interface IDataAllEmployees {
    [key: string]: IDataEmployee
}

//used in testing
export interface IDataEmployeeDetails {
    [key: string]: {
        [key: string]: IDataEmployee
    }
}
