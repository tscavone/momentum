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
    IDataUserScopedSettings,
} from '../../shared/data_definitions/SettingsDefinitions'
import {
    NewUserLocalStorageSettings,
    NewUserServerStorageSettings,
} from './SettingsStoreInitializationData'

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

    write(): Promise<string> {
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

        return this._persistenceProvider.writeSettingsData({
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

    initializeNewUser(localStorage: boolean) {
        if (localStorage) {
            this.loadData(NewUserLocalStorageSettings)
        } else {
            this.loadData(NewUserServerStorageSettings)
        }
    }

    async load(): Promise<string> {
        const jsonSettingsData =
            (await this._persistenceProvider.getSettingsData()) as IDataUserScopedSettings

        this.loadData(jsonSettingsData)

        return Promise.resolve('settings loaded')
    }

    private loadData(jsonSettingsData: IDataUserScopedSettings) {
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

    static getDefaultValues(): IDataSettingsValue[] {
        return [
            {
                _entryId: '1100',
                _id: '1100-10',
                _value: 'test',
            },
            {
                _entryId: '1200',
                _id: '1200-10',
                _value: 'Associate Software Engineer',
                _description:
                    'Somebody just starting out. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
            },
            {
                _entryId: '1200',
                _id: '1200-20',
                _value: 'Software Engineer',
                _description:
                    'Somebody who has been at it for a while. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
            },
            {
                _entryId: '1200',
                _id: '1200-30',
                _value: 'Senior Software Engineer',
                _description:
                    'Should be well versed in a lot of stuff and a good programmer.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            },
            {
                _entryId: '1300',
                _id: '1300-10',
                _value: "How do you debug a problem when you're really stuck?",
            },
            {
                _entryId: '1300',
                _id: '1300-20',
                _value: 'What initially got you into coding?',
            },
            {
                _entryId: '1300',
                _id: '1300-30',
                _value: 'Have you ever eaten Vegemite?',
            },
            {
                _entryId: '1400',
                _id: '1400-10-1',
                _value: 'give a presentation',
                _deleted: 'false',
            },
            {
                _entryId: '1400',
                _id: '1400-10-2',
                _value: 'take a course',
                _deleted: 'false',
            },
            {
                _entryId: '1400',
                _id: '1400-10-3',
                _value: 'plan an outing',
                _deleted: 'false',
            },
            {
                _entryId: '1400',
                _id: '1400-10-4',
                _value: 'read a technical book',
                _deleted: 'false',
            },
        ]
    }
}
