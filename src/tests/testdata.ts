import { IDataGlobal } from '../client/data_definitions/GlobalDefinitions'
import { IDataSettings } from '../client/data_definitions/SettingsDefinitions'
import { IGlobalEmployeeData } from '../client/data_definitions/EmployeeDefinitions'

//global employee data
export const valueTestData: IDataGlobal = {
    abcdef: {
        //IDataEmployees
        '1234': {
            //IDataEmployee
            _notes: {
                //IDataTemporalObject
                _temporalObjects: [
                    {
                        _obj: {
                            _id: '8888b',
                            _text: '<p>Here is the first</p>',
                        },
                        _date: '02/01/2022',
                    },
                    {
                        _obj: {
                            _id: '8888c',
                            _text: '<p>Here is the second</p>',
                        },
                        _date: '03/01/2022',
                    },
                ],
            },
            _stretchAnswers: {
                _temporalObjects: [
                    {
                        _obj: {
                            _id: '9999b',
                            _answer: 'Games, I love games',
                            _questionId: '1300-20',
                        },
                        _date: '02/01/2022',
                    },
                    {
                        _obj: {
                            _id: '9999c',
                            _answer: 'Here is an answer to a deleted question',
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
                        _obj: {
                            _id: '8888l',
                            _text: '<p>USER2 - Here is the first</p>',
                        },
                        _date: '02/02/2022',
                    },
                    {
                        _obj: {
                            _id: '8888g',
                            _text: '<p>USER2 - Here is the second</p>',
                        },
                        _date: '03/02/2022',
                    },
                ],
            },
            _stretchAnswers: {
                _temporalObjects: [
                    {
                        _obj: {
                            _id: '99999b',
                            _answer: 'No, it sounds horrible!',
                            _questionId: '1300-30',
                        },
                        _date: '02/01/2022',
                    },
                ],
            },
        },
    },
    uvwxyz: {
        '9876': {
            _notes: {
                _temporalObjects: [
                    {
                        _obj: {
                            _id: 'b8888',
                            _text: '<p>other user - first note</p>',
                        },
                        _date: '02/01/2022',
                    },
                    {
                        _obj: {
                            _id: 'c8888',
                            _text: '<p>other user - second note</p>',
                        },
                        _date: '03/01/2022',
                    },
                ],
            },
            _stretchAnswers: {
                _temporalObjects: [
                    {
                        _obj: {
                            _id: 'b9999',
                            _answer: 'other user - games got me into this',
                            _questionId: '1300-20',
                        },
                        _date: '02/01/2022',
                    },
                    {
                        _obj: {
                            _id: 'c9999',
                            _answer:
                                'other user - Here is an answer to a deleted question',
                            _questionId: '23213214837894523189473',
                        },
                        _date: '03/01/2022',
                    },
                ],
            },
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
    values: {
        abcdef: [
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
        uvwxyz: [
            {
                _entryId: '1200',
                _id: '1200-10-2',
                _value: 'Associate Software Engineer',
                _description:
                    '[xyz]Somebody just starting out. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
            },
            {
                _entryId: '1200',
                _id: '1200-20-2',
                _value: 'Software Engineer',
                _description:
                    '[xyz]Somebody who has been at it for a while. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
            },
            {
                _entryId: '1200',
                _id: '1200-30-2',
                _value: 'Senior Software Engineer',
                _description:
                    '[xyz]Should be well versed in a lot of stuff and a good programmer.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            },
            {
                _entryId: '1300',
                _id: '1300-10-2',
                _value: "[xyz]How do you debug a problem when you're really stuck?",
            },
            {
                _entryId: '1300',
                _id: '1300-20-2',
                _value: '[xyz]What initially got you into coding?',
            },
            {
                _entryId: '1300',
                _id: '1300-30-2',
                _value: '[xyz]Have you ever eaten Vegemite?',
            },
            {
                _entryId: '1300',
                _id: '32132148378945231894732-2',
                _value: '[xyz]This is a deleted question',
                _deleted: 'true',
            },
        ],
    },
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
