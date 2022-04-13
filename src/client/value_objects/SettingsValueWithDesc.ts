import { IDataSettingsValue } from '../data_definitions/SettingsDefinitions'
import { Id } from '../util/Id'
import { SettingsValue } from './SettingsValue'

export class SettingsValueWithDesc extends SettingsValue {
    private _description: string

    constructor() {
        super()

        this._description = ''
    }

    public static fromJSON(jsonObj: IDataSettingsValue): SettingsValue {
        let entry = Object.assign(
            new SettingsValueWithDesc(),
            jsonObj
        ) as SettingsValueWithDesc
        entry.id = Id.fromString(jsonObj._id)
        entry.entryId = Id.fromString(jsonObj._entryId)

        return entry
    }
    public get description(): string {
        return this._description
    }
    public set description(value: string) {
        this._description = value
    }
}
