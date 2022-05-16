import { IDataMultiuserTest } from '../client/data_definitions/GlobalDefinitions'
import { IDataSettings } from '../client/data_definitions/SettingsDefinitions'
import { IDataEmployeeDetails } from '../client/data_definitions/EmployeeDefinitions'
import { IDataAuthedUser } from '../client/data_definitions/AuthedUserDefinitions'
import { IDataAllEmployeeSelections } from '../client/data_definitions/SelectedEmployeeDefinitions'

//test global business logic data
export const valueTestData: IDataMultiuserTest = {
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
            _statusAndGoals: {
                _temporalObjects: [
                    {
                        _obj: {
                            _id: '1111sg',
                            _status: 'Working on new UI for patients',
                            _goals: [
                                {
                                    _id: '11111g',
                                    _settingValueId: '1400-10-1',
                                    _details:
                                        'give a presentation on react hooks so that my team can start using them',
                                    _milestones: [],
                                    _links: [
                                        {
                                            _id: '00000l',
                                            _text: 'react hooks documentation',
                                            _target:
                                                'https://reactjs.org/docs/hooks-intro.html',
                                        },
                                        {
                                            _id: '11111l',
                                            _text: 'further hooks info',
                                            _target:
                                                'https://reactjs.org/docs/hooks-overview.html',
                                        },
                                    ],
                                    _progress: 0,
                                },
                                {
                                    _id: '22222g',
                                    _settingValueId: '1400-10-2',
                                    _details: 'take a course on typescript',
                                    _milestones: [],
                                    _links: [
                                        {
                                            _id: '22222l',
                                            _text: 'typescript full tutorial',
                                            _target:
                                                'https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwiIup6D5Ln3AhXbhIkEHSDmC_kQyCl6BAgDEAM&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DBwuLxPH8IDs&usg=AOvVaw22ZOiiCMMvZo54bMSj42o5',
                                        },
                                    ],
                                    _progress: 0,
                                },
                            ],
                        },
                        _date: '02/01/2022',
                    },
                    {
                        _obj: {
                            _id: '2222sg',
                            _status:
                                'good progress on UI for patients, also working with product on building out epics',
                            _goals: [
                                {
                                    _id: '11111g-2',
                                    _settingValueId: '1400-10-1',
                                    _details:
                                        'give a presentation on react hooks so that my team can start using them',
                                    _milestones: [],
                                    _links: [
                                        {
                                            _id: '55555l',
                                            _text: 'react hooks documentation',
                                            _target:
                                                'https://reactjs.org/docs/hooks-intro.html',
                                        },
                                        {
                                            _id: '66666l',
                                            _text: 'further hooks info',
                                            _target:
                                                'https://reactjs.org/docs/hooks-overview.html',
                                        },
                                    ],
                                    _progress: 20,
                                },
                                {
                                    _id: '22222g-2',
                                    _settingValueId: '1400-10-2',
                                    _details: 'take a course on typescript',
                                    _milestones: [],
                                    _links: [
                                        {
                                            _id: '33333l',
                                            _text: 'typescript full tutorial',
                                            _target:
                                                'https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwiIup6D5Ln3AhXbhIkEHSDmC_kQyCl6BAgDEAM&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DBwuLxPH8IDs&usg=AOvVaw22ZOiiCMMvZo54bMSj42o5',
                                        },
                                    ],
                                    _progress: 40,
                                },
                            ],
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
            _statusAndGoals: {
                _temporalObjects: [
                    {
                        _obj: {
                            _id: '1111sg-2',
                            _status:
                                'Trying to come up to speed on new code base',
                            _goals: [
                                {
                                    _id: '33333g',
                                    _settingValueId: '1400-20-3',
                                    _details: 'planning a team lunch',
                                    _milestones: [],
                                    _links: [
                                        {
                                            _id: '44444l',
                                            _text: 'kings bowling',
                                            _target:
                                                'https://www.kings-de.com/store-locator/',
                                        },
                                    ],
                                    _progress: 0,
                                },
                            ],
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
                            _questionId: '1300-20-2',
                        },
                        _date: '02/01/2022',
                    },
                    {
                        _obj: {
                            _id: 'c9999',
                            _answer:
                                'other user - Here is an answer to a deleted question',
                            _questionId: '32132148378945231894732-2',
                        },
                        _date: '03/01/2022',
                    },
                ],
            },
            _statusAndGoals: {
                _temporalObjects: [
                    {
                        _obj: {
                            _id: '1111sg-3',
                            _status:
                                'Writing kafka connector to be able to sync data between legacy databases',
                            _goals: [
                                {
                                    _id: '44444g',
                                    _settingValueId: '1400-20-4',
                                    _details:
                                        'reading Code Complete because my manager says it is amazing',
                                    _milestones: [],
                                    _links: [],
                                    _progress: 0,
                                },
                            ],
                        },
                        _date: '02/01/2022',
                    },
                ],
            },
        },
    },
}

//test settings data
export const settingsTestData: IDataSettings = {
    entries: [
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
    ],
    values: {
        abcdef: [
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
                _entryId: '1300',
                _id: '32132148378945231894732',
                _value: 'This is a deleted question',
                _deleted: 'true',
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
        ],
        uvwxyz: [
            {
                _entryId: '1100',
                _id: '1100-10-2',
                _value: 'test',
            },
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
            {
                _entryId: '1400',
                _id: '1400-20-1',
                _value: 'give a presentation',
                _deleted: 'false',
            },
            {
                _entryId: '1400',
                _id: '1400-20-2',
                _value: 'take a course',
                _deleted: 'false',
            },
            {
                _entryId: '1400',
                _id: '1400-20-3',
                _value: 'plan an outing',
                _deleted: 'false',
            },
            {
                _entryId: '1400',
                _id: '1400-20-4',
                _value: 'read a technical book',
                _deleted: 'false',
            },
        ],
    },
}

//test employee datak
export const employeeTestData: IDataEmployeeDetails = {
    abcdef: {
        '1234': {
            _id: '1234',
            _first: 'Tom',
            _last: 'Waits',
            _email: 'ascavone+1@gmail.com',
            _startDate: '01/01/2022',
            _position: '1200-10',
            _skills: [],
            _interests: ['foosball', 'running'],
            _college: 'umass',
            _hometown: 'Boston',
            _townOfResidence: 'Cambridge',
            _birthMonthDay: '',
            _pets: ['cat: fluffy'],
            _additionalDetails:
                'Tom is an awesome musician with a sick gravelly voice like an angel with throat cancer',
        },
        '2345': {
            _id: '2345',
            _first: 'Brandon',
            _last: 'Flowers',
            _email: 'ascavone+2@gmail.com',
            _startDate: '02/02/2022',
            _position: '1200-20',
            _skills: [],
            _interests: ['music', 'videogames'],
            _college: 'mit',
            _hometown: 'Las Vegas',
            _townOfResidence: 'Somerville',
            _birthMonthDay: '08/05/22',
            _pets: ['dog: atom'],
            _additionalDetails:
                'Brandon writes music like a millenial Bruce Springsteen',
        },
    },
    uvwxyz: {
        '9876': {
            _id: '9876',
            _first: 'Josh',
            _last: 'Ritter',
            _email: 'ascavone+3@gmail.com',
            _startDate: '03/03/2022',
            _position: '1200-30',
            _skills: ['scuba diving', 'legos'],
            _interests: ['writing'],
            _college: 'boston school of culinary arts',
            _hometown: 'Elkhorn City, Oh',
            _townOfResidence: 'Somerville',
            _birthMonthDay: '03/03/22',
            _pets: ['parrot: polly', 'fish: aldo'],
            _additionalDetails: "josh's lyrics rival Bob Dylan",
        },
    },
}

//auto login user for now...
export const TestAuthedUserData: IDataAuthedUser = {
    _userId: 'abcdef',
    _token: 'abc123',
}

//test user selction
export const TestSelectedEmployeeData: IDataAllEmployeeSelections = {
    abcdef: { _selectedId: '1234' },
    uvwxyz: { _selectedId: '9876' },
}
