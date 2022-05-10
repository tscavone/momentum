// a type of setting with description of what that setting is for
//

import { IDataSettingsEntry } from '../data_definitions/SettingsDefinitions'
import { Id } from '../util/Id'
import { IdentifiedObject } from '../util/IdentifiedObject'

export enum SettingsType {
    select,
    multiple,
    single,
    range,
    number,
}

export class SettingsEntry extends IdentifiedObject {
    private _name: string
    private _description: string
    private _potentialValues: string[]
    private _type: SettingsType

    constructor() {
        super()

        this._name = ''
        this._description = ''
        this._potentialValues = []
        this._type = SettingsType.single
    }

    public get name(): string {
        return this._name
    }
    public set name(value: string) {
        this._name = value
    }

    public get description(): string {
        return this._description
    }
    public set description(value: string) {
        this._description = value
    }
    public get potentialValues(): string[] {
        return this._potentialValues
    }
    public set potentialValues(value: string[]) {
        this._potentialValues = value
    }
    public get type(): SettingsType {
        return this._type
    }
    public set type(value: SettingsType) {
        this._type = value
    }

    public static fromJSON(jsonObj: IDataSettingsEntry): SettingsEntry {
        let entry = Object.assign(new SettingsEntry(), jsonObj) as SettingsEntry
        entry.id = Id.fromString(jsonObj._id)

        if (jsonObj._potentialValues) {
            let potentialValues: string[] = [...jsonObj._potentialValues]

            entry._potentialValues = potentialValues
        }

        switch (jsonObj._type) {
            case 'select':
                entry._type = SettingsType.select
                break
            case 'multiple':
                entry._type = SettingsType.multiple
                break
            case 'single':
                entry._type = SettingsType.single
                break
            case 'range':
                entry._type = SettingsType.range
                break
            case 'multiple':
                entry._type = SettingsType.multiple
                break
            default:
                throw Error(
                    'incorrect type loaded in SettingsEntry:  ' + jsonObj._type
                )
        }

        return entry
    }

    public serialize(): IDataSettingsEntry {
        let type = ''

        switch (this._type) {
            case SettingsType.select:
                type = 'select'
                break
            case SettingsType.multiple:
                type = 'multiple'
                break
            case SettingsType.single:
                type = 'single'
                break
            case SettingsType.range:
                type = 'range'
                break
            case SettingsType.multiple:
                type = 'multiple'
                break
            default:
                throw Error(
                    'incorrect type loaded in SettingsEntry:  ' + this._type
                )
        }

        return {
            _id: this.id.id,
            _name: this._name,
            _description: this._description,
            _potentialValues: [...this._potentialValues],
            _type: type,
        }
    }
}
