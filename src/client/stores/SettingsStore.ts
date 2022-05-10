import { SettingsValue } from '../value_objects/SettingsValue'
import { SettingsEntry } from '../value_objects/SettingsEntry'
import { IStore } from './IStore'
import { SettingsValueWithDesc } from '../value_objects/SettingsValueWithDesc'
import { Id } from '../util/Id'
import { makeAutoObservable } from 'mobx'
import { IPersistenceProvider } from '../persistence/IPersistenceProvider'
import { IWriteable } from '../persistence/IWriteable'
import {
    IDataSettingsEntry,
    IDataSettingsValue,
} from '../data_definitions/SettingsDefinitions'

export class SettingsStore implements IStore, IWriteable {
    // keyed by id
    private _settings: Map<string, [SettingsEntry, SettingsValue[]]>
    _persistenceProvider: IPersistenceProvider

    constructor() {
        makeAutoObservable(this)
        this._settings = new Map<string, [SettingsEntry, SettingsValue[]]>()
        this._persistenceProvider = null
    }

    public get settings(): Map<string, [SettingsEntry, SettingsValue[]]> {
        return this._settings
    }
    public set settings(value: Map<string, [SettingsEntry, SettingsValue[]]>) {
        this._settings = value
    }

    get persistenceProvider(): IPersistenceProvider {
        return this._persistenceProvider
    }

    set persistenceProvider(value: IPersistenceProvider) {
        this._persistenceProvider = value
    }

    write(): void {
        if (this._persistenceProvider === null)
            throw new Error('peristenceProvider null in SettingsStore')

        let entries: IDataSettingsEntry[] = []
        for (const [id, settingsEntry] of this._settings) {
            entries.push(settingsEntry[0].serialize())
        }

        let values: IDataSettingsValue[] = []
        for (const [id, SettingsEntry] of this._settings) {
            for (const settingsValue of SettingsEntry[1]) {
                values.push(settingsValue.serialize())
            }
        }

        this._persistenceProvider.writeSettingsData({
            entries,
            values,
        })
    }

    getByEntryId(entryId: string): [SettingsEntry, SettingsValue[]] {
        const setting: [SettingsEntry, SettingsValue[]] =
            this._settings.get(entryId)

        if (!setting) throw `getByEntryId: setting not found with id ${entryId}`

        return setting
    }

    //returns the an array, the first object being the settings entry that matches the name,
    // the second element being an array of settings values that correspond to that entry for
    // this loaded user
    getByEntryName(name: string): [SettingsEntry, SettingsValue[]] {
        for (const [id, setting] of this._settings) {
            if (setting[0].name === name) {
                return this.getByEntryId(id)
            }
        }

        throw `getByEntryName: setting not found with name ${name}`
    }

    getValueById(id: Id | string): SettingsValue {
        const idStr = Id.asString(id)
        let foundSettingValue = null
        for (const [id, setting] of this._settings) {
            setting[1].forEach((settingValue) => {
                if (settingValue.id.id === idStr) {
                    foundSettingValue = settingValue
                }
            })
        }

        if (foundSettingValue !== null) {
            return foundSettingValue
        } else {
            throw `getValueById: value not found with id ${idStr}`
        }
    }

    deleteValue(id: Id | string) {
        const idStr = Id.asString(id)

        for (const [id, setting] of this._settings) {
            let settingsValue = setting[1].find(
                (settingsValue) => settingsValue.id.id === idStr
            )

            if (settingsValue) {
                settingsValue.deleted = true
                return
            }
        }

        throw `deleteValue: value not found to be deleted: ${idStr}`
    }

    load(): void {
        const jsonSettingsData = this._persistenceProvider.getSettingsData()

        //clear all existing data
        this._settings.clear()

        const entries = new Map<string, SettingsEntry>()
        const values = new Map<string, SettingsValue[]>()

        //load entries
        for (const jsonEntry of jsonSettingsData['entries']) {
            const entry = SettingsEntry.fromJSON(jsonEntry)
            entries.set(entry.id.id, entry)
        }

        //load values
        for (const jsonValue of jsonSettingsData['values']) {
            let value = null

            if (jsonValue._description) {
                value = SettingsValueWithDesc.fromJSON(jsonValue)
            } else {
                value = SettingsValue.fromJSON(jsonValue)
            }

            let entryValues = values.get(value._entryId.id)

            //if this is the first value for this entry
            if (typeof entryValues === 'undefined') {
                entryValues = []
            }
            entryValues.push(value)
            values.set(value._entryId.id, entryValues)
        }

        //populate store
        //for each entry
        entries.forEach((entry, key) => {
            let entryValues = values.get(entry.id.id)

            //NOTE: this error can occur if there is a new setting and no values associated with it
            if (!entryValues)
                throw 'Internal error, values not mapped to settings entries'

            this._settings.set(key, [entry, entryValues])
        })
    }

    static valuesFromSettings(
        settings: Map<string, [SettingsEntry, SettingsValue[]]>
    ) {
        const settingsValues: SettingsValue[] = []

        for (const entryAndValue of settings.values()) {
            settingsValues.push(...entryAndValue[1])
        }

        return settingsValues
    }

    static removeValue(
        id: Id | string,
        settings: Map<string, [SettingsEntry, SettingsValue[]]>
    ) {
        const idStr = Id.asString(id)

        for (const [id, setting] of settings) {
            let settingsValueIndex = setting[1].findIndex(
                (settingsValue) => settingsValue.id.id === idStr
            )

            if (settingsValueIndex) {
                setting[1].splice(settingsValueIndex, 1)
                settings.set(id, [setting[0], setting[1]])
                return settings
            }
        }

        throw `SettingsStore.deleteValue: value not found to be deleted: ${idStr}`
    }

    saveSettings(settings: [SettingsEntry, SettingsValue[]][]) {
        this._settings.clear()

        for (const settingEntryAndValues of settings) {
            this._settings.set(settingEntryAndValues[0].id.id, [
                settingEntryAndValues[0],
                settingEntryAndValues[1],
            ])
        }
    }

    setValues(settingsValues: SettingsValue[]) {
        const valuesByEntryId = new Map<string, SettingsValue[]>()

        for (const settingsValue of settingsValues) {
            let entryValues = valuesByEntryId.get(settingsValue.entryId.id)

            if (!entryValues) entryValues = []

            entryValues.push(settingsValue)
            valuesByEntryId.set(settingsValue.entryId.id, entryValues)
        }

        let newSettings = new Map<string, [SettingsEntry, SettingsValue[]]>()
        for (const settingId of this._settings.keys()) {
            const oldEntryAndValues = this._settings.get(settingId)

            newSettings.set(settingId, [
                oldEntryAndValues[0],
                valuesByEntryId.get(settingId),
            ])
        }

        this._settings = newSettings
    }
}
