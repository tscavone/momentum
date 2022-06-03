import { IDataSettingsValue } from '../../shared/data_definitions/SettingsDefinitions'
import { Id } from '../util/Id'
import { IdentifiedObject } from '../util/IdentifiedObject'

export class SettingsValue extends IdentifiedObject {
    private _value: string
    private _entryId: Id
    private _deleted: boolean

    constructor() {
        super()

        this._value = ''
        this._entryId = new Id()
        this._deleted = false
    }

    public get value(): string {
        return this._value
    }
    public set value(value: string) {
        this._value = value
    }
    public get entryId(): Id {
        return this._entryId
    }
    public set entryId(value: Id) {
        this._entryId = value
    }
    public get deleted(): boolean {
        return this._deleted
    }
    public set deleted(value: boolean) {
        this._deleted = value
    }
    public static fromJSON(jsonObj: IDataSettingsValue): SettingsValue {
        let entry = Object.assign(new SettingsValue(), jsonObj) as SettingsValue
        entry._entryId = Id.fromString(jsonObj._entryId)
        entry.id = Id.fromString(jsonObj._id)
        entry._deleted = Boolean(jsonObj._deleted)
        return entry
    }

    public serialize(): IDataSettingsValue {
        return {
            _id: this.id.id,
            _entryId: this.entryId.id,
            _value: this.value,
            _deleted: this.deleted ? 'true' : 'false',
        }
    }
}
