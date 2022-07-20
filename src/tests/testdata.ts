import { IDataMultiuserTest } from '../shared/data_definitions/GlobalDefinitions'
import { IDataTestSettings } from '../shared/data_definitions/SettingsDefinitions'
import { IDataEmployeeDetails } from '../shared/data_definitions/EmployeeDefinitions'
import { IDataAuthedUser } from '../shared/data_definitions/AuthedUserDefinitions'
import { IDataSelectedEmployees } from '../shared/data_definitions/SelectedEmployeeDefinitions'
import { IDataFollowUpAllUsers } from '../shared/data_definitions/FollowUpDefinitions'

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
                            _text: '<p>Lamar is doing great work</p>',
                        },
                        _date: '02/01/2022',
                    },
                    {
                        _obj: {
                            _id: '8888c',
                            _text: '<p>Lamar and I talked for a while about his childhood among other things</p>',
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
                            _answer:
                                'Originally video games, modding and playing them got him into programming. He programmed his first game in basic at age 10',
                            _questionId: '1300-20',
                        },
                        _date: '02/01/2022',
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
export const settingsTestData: IDataTestSettings = {
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
                    'A new entry into software engineering. Should be able to effectively address targeted, contained tickets within their area of expertise',
            },
            {
                _entryId: '1200',
                _id: '1200-20',
                _value: 'Software Engineer',
                _description:
                    'An engineer that has proven themselves capable at the Associate level and is now ready for larger scoped work. Should be able to step out of comfort zone and engage in more challenging assignments',
            },
            {
                _entryId: '1200',
                _id: '1200-30',
                _value: 'Software Engineer II',
                _description:
                    'Having proven themselves capable of more challenging tasks outside their comfort zone, an SE II should be stepping into new roles like mentor, code reviewer, epic groomer, etc',
            },
            {
                _entryId: '1200',
                _id: '1200-40',
                _value: 'Senior Software Engineer',
                _description:
                    'A Senior Engineer capable of taking on complex tasks and completing them with little oversight. Should be able to accurately estimate work and potentially act as Team Lead',
            },
            {
                _entryId: '1200',
                _id: '1200-40',
                _value: 'Principle Software Engineer',
                _description:
                    'Can address virtually any problem or task in the stack, is an expert in our codebase and can be turned to for guidance on emerging trends in the industry',
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
                _value: "When do you feel like you're at your best developing? What sets you up for success?",
            },
            {
                _entryId: '1300',
                _id: '1300-40',
                _value: 'What part of your day to day job is most energizing? Which is draining?',
            },
            {
                _entryId: '1300',
                _id: '1300-50',
                _value: 'What do you wish you could do more or less of?',
            },
            {
                _entryId: '1300',
                _id: '1300-60',
                _value: 'Is there a part of the company you would like to learn more about or work with?',
            },
            {
                _entryId: '1300',
                _id: '1300-70',
                _value: 'Do you have any side projects at home or here that you are working on or would like to?',
            },
            {
                _entryId: '1300',
                _id: '1300-80',
                _value: 'Do you have any side projects at home or here that you are working on or would like to?',
            },
            {
                _entryId: '1300',
                _id: '1300-90',
                _value: 'Are you up against any time wasters in your day-to-day? Is there anything we can do to minimize them?',
            },
            {
                _entryId: '1300',
                _id: '1300-100',
                _value: 'How do you feel about the amount of feedback you are getting?',
            },
            {
                _entryId: '1400',
                _id: '1400-10-1',
                _value: 'give a technical presentation',
                _deleted: 'false',
            },
            {
                _entryId: '1400',
                _id: '1400-10-2',
                _value: 'coursework for expanded expertise',
                _deleted: 'false',
            },
            {
                _entryId: '1400',
                _id: '1400-10-3',
                _value: 'plan an outing for the team',
                _deleted: 'false',
            },
            {
                _entryId: '1400',
                _id: '1400-10-4',
                _value: 'read a technical book or paper',
                _deleted: 'false',
            },
            {
                _entryId: '1400',
                _id: '1400-10-5',
                _value: 'work on a side project',
                _deleted: 'false',
            },
            {
                _entryId: '1400',
                _id: '1400-10-6',
                _value: 'address tech debt',
                _deleted: 'false',
            },
            {
                _entryId: '1400',
                _id: '1400-10-7',
                _value: 'scrummaster a team',
                _deleted: 'false',
            },
            {
                _entryId: '1400',
                _id: '1400-10-8',
                _value: 'conduct a retrospective',
                _deleted: 'false',
            },
            {
                _entryId: '1400',
                _id: '1400-10-5',
                _value: 'document an aread of expertise',
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

//test employee data
export const employeeTestData: IDataEmployeeDetails = {
    abcdef: {
        '1234': {
            _id: '1234',
            _first: 'Lamar',
            _last: 'Smith',
            _email: 'ascavone+1@gmail.com',
            _startDate: '01/01/2022',
            _position: '1200-30',
            _skills: [
                'react',
                'python',
                'javascript',
                'mentoring',
                'data science',
            ],
            _interests: ['foosball', 'running'],
            _college: 'MIT',
            _hometown: 'Boston',
            _townOfResidence: 'Cambridge',
            _birthMonthDay: '2/28/22',
            _pets: ['cat: fluffy'],
            _additionalDetails:
                'Lamar has asperations to one day create his own startup',
        },
        '2345': {
            _id: '2345',
            _first: 'Nessa',
            _last: 'Flowers',
            _email: 'ascavone+2@gmail.com',
            _startDate: '02/02/2022',
            _position: '1200-20',
            _skills: [
                'java',
                'javascript',
                'clojure',
                'lisp',
                'mentoring',
                'spring',
            ],
            _interests: ['music', 'videogames'],
            _college: 'Harvard',
            _hometown: 'Las Vegas',
            _townOfResidence: 'Somerville',
            _birthMonthDay: '08/05/22',
            _pets: ['dog: atom'],
            _additionalDetails:
                'Nessa might like to explore working in Solutions',
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

export const followUpTestData: IDataFollowUpAllUsers = {
    abcdef: {
        '1234': [
            {
                _id: '5555',
                _text: 'open enrollment',
                _resolvedDate: '',
            },
            {
                _id: '5556',
                _text: 'all hands on Friday',
                _resolvedDate: '',
            },
            {
                _id: '5557',
                _text: 'company outing - team bowling ',
                _resolvedDate: '',
            },
            {
                _id: '5558',
                _text: 'need to take vacation days',
                _resolvedDate: '',
            },
        ],
        '2345': [
            {
                _id: '5555-2',
                _text: 'open enrollment - user 2',
                _resolvedDate: '',
            },
            {
                _id: '5556-2',
                _text: 'all hands on Friday - user 2',
                _resolvedDate: '',
            },
            {
                _id: '5557-2',
                _text: 'company outing -  bowling for the team - user 2 ',
                _resolvedDate: '',
            },
        ],
    },
    uvwxyz: {
        '9876': [
            {
                _id: '5555',
                _text: 'Open enrollment',
                _resolvedDate: '2/2/21',
            },
        ],
    },
}

//auto login user for now...
export const TestAuthedUserData: IDataAuthedUser = {
    _userId: 'abcdef',
    _token: 'abc123',
}

//test user selction
export const TestSelectedEmployeeData: IDataSelectedEmployees = {
    abcdef: { _selectedId: '1234' },
    uvwxyz: { _selectedId: '9876' },
}
