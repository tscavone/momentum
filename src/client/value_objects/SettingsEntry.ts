// a type of setting with description of what that setting is for
//

import { IDataSettingsEntry } from '../data_definitions/SettingsDefinitions'
import { Id } from '../util/Id'
import { IdentifiedObject } from '../util/IdentifiedObject'

export class SettingsEntry extends IdentifiedObject {
    //
    //members
    //
    private _name: string
    private _description: string
    private _potentialValues: string[]

    //
    //
    //
    constructor() {
        super()

        this._name = ''
        this._description = ''
        this._potentialValues = []
    }

    //
    //accessors
    //
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

    //
    //private methods
    //

    //
    //public methods
    //
    public static fromJSON(jsonObj: IDataSettingsEntry): SettingsEntry {
        let entry = Object.assign(new SettingsEntry(), jsonObj) as SettingsEntry
        entry.id = Id.fromString(jsonObj._id)

        if (jsonObj._potentialValues) {
            let potentialValues: string[] = [...jsonObj._potentialValues]

            entry._potentialValues = potentialValues
        }

        return entry
    }
}
