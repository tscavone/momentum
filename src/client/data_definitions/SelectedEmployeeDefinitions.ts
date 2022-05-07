export interface IDataSelectedEmployee {
    _selectedId: string
}
export interface IDataAllEmployeeSelections {
    [key: string]: { _selectedId: string }
}
