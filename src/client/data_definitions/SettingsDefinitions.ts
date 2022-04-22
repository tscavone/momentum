export interface IDataSettingsEntry {
    _id: string
    _name: string
    _description: string
    _type: string
    _potentialValues?: string[]
}

export interface IDataSettingsValue {
    _entryId: string
    _id: string
    _value: string
    _description?: string
    _deleted?: string
}

export interface IDataSettings {
    entries: IDataSettingsEntry[]
    values: {
        [key: string]: IDataSettingsValue[]
    }
}
