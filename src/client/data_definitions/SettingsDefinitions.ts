export interface IDataSettingsEntry {
    _id: string,
    _name: string,
    _description: string,
    _potentialValues?: IDataSettingsEntry[]
}

export interface IDataSettingsValue {
    _entryId: string,
    _id: string,
    _name: string,
    _description: string
}

export interface IDataSettings{
    "entries": IDataSettingsEntry[],
    "values": IDataSettingsValue[] 
}