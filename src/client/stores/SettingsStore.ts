import { Id } from '../util/Id'
import { SettingsValue } from '../value_objects/SettingsValue'
import { SettingsEntry } from '../value_objects/SettingsEntry'
import { IStore } from './IStore'
import { IDataSettings } from '../data_definitions/SettingsDefinitions'
import { SettingsValueWithDesc } from '../value_objects/SettingsValueWithDesc'
import { entries } from 'lodash'

export const settingsTestData: IDataSettings = {
    entries: [
        {
            _id: '1200',
            _name: 'positions',
            _description: 'An employment-level for software engineers',
        },
        {
            _id: '1300',
            _name: 'stretch questions',
            _description: 'Questions to ask to get to know your reports better',
        },
    ],
    values: [
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
    ],
}

export class SettingsStore implements IStore {
    //
    //members
    //
    _settings: Map<string, [SettingsEntry, SettingsValue[]]>

    //
    //constructor
    //
    constructor() {
        this._settings = new Map<string, [SettingsEntry, SettingsValue[]]>()
    }

    getByEntryId(entryId: string): [SettingsEntry, SettingsValue[]] {
        const setting: [SettingsEntry, SettingsValue[]] =
            this._settings.get(entryId)

        if (!setting) throw `getByEntryId: setting not found with id ${entryId}`

        return setting
    }

    getByEntryName(name: string): [SettingsEntry, SettingsValue[]] {
        for (const [id, setting] of this._settings) {
            console.log(
                `checking for passed "${name}" against "${setting[0].name}"`
            )
            if (setting[0].name === name) {
                console.log(`returning`, this.getByEntryId(id))
                return this.getByEntryId(id)
            }
        }

        throw `getByEntryName: setting not found with name ${name}`
    }

    load(jsonObj: IDataSettings, employeeId?: Id): void {
        //because we can't overload 'load' :/
        if (employeeId)
            throw "Settings Store doesn't use employeeId so this was most likely called in error"

        const entries = new Map<string, SettingsEntry>()
        const values = new Map<string, SettingsValue[]>()

        //load entries
        for (const jsonEntry of jsonObj['entries']) {
            const entry = SettingsEntry.fromJSON(jsonEntry)
            entries.set(entry.id.id, entry)
        }

        //load values
        for (const jsonValue of jsonObj['values']) {
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

            if (!entryValues)
                throw 'Internal error, values not mapped to settings entries'

            this._settings.set(key, [entry, entryValues])
        })

        console.log('SETTINGS LOADED', this._settings)
    }
}
