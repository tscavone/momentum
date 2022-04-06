import { IDataGlobal } from '../client/data_definitions/GlobalDefinitions'
import { IDataSettings } from '../client/data_definitions/SettingsDefinitions'
import { IGlobalEmployeeData } from '../client/data_definitions/EmployeeDefinitions'

//global employee data
export const valueTestData: IDataGlobal = {
    '1234': {
        _notes: {
            _temporalObjects: [
                {
                    _obj: { _id: '8888b', _text: 'Here is the first' },
                    _date: '02/01/2022',
                },
                {
                    _obj: { _id: '8888c', _text: 'Here is the second' },
                    _date: '03/01/2022',
                },
            ],
        },
        _stretchAnswers: {
            _temporalObjects: [
                {
                    _obj: {
                        _id: '9999b',
                        _answer: '<p>Games, I love games</p>',
                        _questionId: '1300-20',
                    },
                    _date: '02/01/2022',
                },
                {
                    _obj: {
                        _id: '9999c',
                        _answer:
                            '<p>Here is an answer to a deleted question</p>',
                        _questionId: '32132148378945231894732',
                    },
                    _date: '03/01/2022',
                },
            ],
        },
    },
    '2345': {
        _notes: {
            _temporalObjects: [
                {
                    _obj: { _id: '8888l', _text: 'USER2 - Here is the first' },
                    _date: '02/02/2022',
                },
                {
                    _obj: { _id: '8888g', _text: 'USER2 - Here is the second' },
                    _date: '03/02/2022',
                },
            ],
        },
        _stretchAnswers: {
            _temporalObjects: [
                {
                    _obj: {
                        _id: '99999b',
                        _answer: '<p>No, it sounds horrible!</p>',
                        _questionId: '1300-30',
                    },
                    _date: '02/01/2022',
                },
            ],
        },
    },
}

//settings data
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
        {
            _entryId: '1300',
            _id: '32132148378945231894732',
            _value: 'This is a deleted question',
            _deleted: 'true',
        },
    ],
}

//employee data
export const employeeTestData: IGlobalEmployeeData = {
    '1234': {
        _id: '1234',
        _first: 'Tom',
        _last: 'Waits',
    },
    '2345': {
        _id: '2345',
        _first: 'Brandon',
        _last: 'Flowers',
    },
}
