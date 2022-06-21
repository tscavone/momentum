import { IDataUserScopedSettings } from '../../shared/data_definitions/SettingsDefinitions'
import { Id } from '../util/Id'

const TestStorageValue = {
    _entryId: '1100',
    _id: new Id().id,
    _value: 'test',
}

const LocalStorageValue = {
    _entryId: '1100',
    _id: new Id().id,
    _value: 'local',
}
const ServerStorageValue = {
    _entryId: '1100',
    _id: new Id().id,
    _value: 'local',
}

const NewUserSettingsEntries = [
    {
        _id: '1100',
        _name: 'persistence',
        _description:
            'what type of persistence would you like to use [local/browser, server]',
        _potentialValues: ['test', 'local', 'server'],
        _type: 'select',
    },
    {
        _id: '1200',
        _name: 'positions',
        _description: 'employment-levels for software engineers',
        _type: 'multiple',
    },
    {
        _id: '1300',
        _name: 'stretch questions',
        _description: 'questions to ask to get to know your reports better',
        _type: 'multiple',
    },
    {
        _id: '1400',
        _name: 'goals',
        _description:
            'goals that employees can work towards for personal development',
        _type: 'multiple',
    },
]

const NewUserSettingsValues = [
    {
        _entryId: '1200',
        _id: new Id().id,
        _value: 'Associate Software Engineer',
        _description:
            'employee is just starting out, usually this position is the first of their career',
    },
    {
        _entryId: '1200',
        _id: new Id().id,
        _value: 'Software Engineer',
        _description:
            'employee who has a fair amount of experience software engineering, usually somewhere between 2 and 5 years of experience',
    },
    {
        _entryId: '1200',
        _id: new Id().id,
        _value: 'Senior Software Engineer',
        _description:
            'employee who is experienced in various areas of engineering, usually somewhere between 5 to 10 years of experience with several major projects under their belt',
    },
    {
        _entryId: '1300',
        _id: new Id().id,
        _value: 'what initially got you into coding?',
    },
    {
        _entryId: '1400',
        _id: new Id().id,
        _value: 'give a technical presentation',
        _deleted: 'false',
    },
]

export const NewUserServerStorageSettings: IDataUserScopedSettings = {
    entries: NewUserSettingsEntries,
    values: NewUserSettingsValues.concat(ServerStorageValue),
}

export const NewUserLocalStorageSettings: IDataUserScopedSettings = {
    entries: NewUserSettingsEntries,
    values: NewUserSettingsValues.concat(LocalStorageValue),
}
