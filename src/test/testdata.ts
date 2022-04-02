import { IDataGlobal } from '../client/data_definitions/GlobalDefinitions'
import { IDataSettings } from '../client/data_definitions/SettingsDefinitions'
import { IGlobalEmployeeData } from '../client/data_definitions/EmployeeDefinitions'

//global employee data
export const valueTestData: IDataGlobal = {
    '1234': {
        _notes: {
            _current: {
                _id: '8888a',
                _text: '<p>This is editable <strong>rich</strong> text, much better than a &lt;textarea&gt;!</p><p>Since it&#39;s rich text, you can do things like turn a selection of text <strong>bold</strong>, or add a semantically rendered block quote in the middle of the page, like this:</p><blockquote class="blockquote"><p>A wise quote.</p></blockquote><p>Try it out for yourself!</p>',
            },
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
            _current: {
                _id: '9999a',
                _answer: 'I try really really hard to figure it out',
                _question:
                    "How do you debug a problem when you're really stuck?",
            },
            _temporalObjects: [
                {
                    _obj: {
                        _id: '9999b',
                        _answer: 'Games, I love games',
                        _question: 'What initially got you into coding?',
                    },
                    _date: '02/01/2022',
                },
                {
                    _obj: {
                        _id: '9999b',
                        _answer: 'Here is an answer to a deleted question',
                        _question: 'Here is a deleted question?',
                    },
                    _date: '03/01/2022',
                },
            ],
        },
    },
    '2345': {
        _notes: {
            _current: {
                _id: '8888z',
                _text: '<p> USER2 -- This is editable <strong>rich</strong> text, much better than a &lt;textarea&gt;!</p><p>Since it&#39;s rich text, you can do things like turn a selection of text <strong>bold</strong>, or add a semantically rendered block quote in the middle of the page, like this:</p><blockquote class="blockquote"><p>A wise quote.</p></blockquote><p>Try it out for yourself!</p>',
            },
            _temporalObjects: [
                {
                    _obj: { _id: '8888l', _text: 'USER2 - Here is the first' },
                    _date: '02/02/2022',
                },
                {
                    _obj: { _id: '8888g', _text: 'USER2 -Here is the second' },
                    _date: '03/02/2022',
                },
            ],
        },
        _stretchAnswers: {
            _current: {
                _id: '9999a',
                _answer: 'I wrote an app to help my mom with her business',
                _question: 'What initially got you into coding?',
            },
            _temporalObjects: [
                {
                    _obj: {
                        _id: '9999b',
                        _answer: 'No, it sounds horrible!',
                        _question: 'Have you ever eaten Vegemite?',
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
