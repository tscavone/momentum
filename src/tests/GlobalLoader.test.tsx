import {
    IDataGoal,
    IDataLink,
} from '../shared/data_definitions/GlobalDefinitions'
import { RootStore } from '../client/stores/RootStore'
import { DatedObject } from '../client/util/DatedObject'
import { Id } from '../client/util/Id'
import { Goal } from '../client/value_objects/Goal'
import { Link } from '../client/value_objects/Link'
import { Note } from '../client/value_objects/Note'
import {
    SettingsEntry,
    SettingsType,
} from '../client/value_objects/SettingsEntry'
import { SettingsValue } from '../client/value_objects/SettingsValue'
import { SettingsValueWithDesc } from '../client/value_objects/SettingsValueWithDesc'
import { StatusAndGoals } from '../client/value_objects/StatusAndGoals'
import { StretchAnswer } from '../client/value_objects/StretchAnswer'

test('Root store constructs', () => {
    const rootStore = new RootStore()
})

test('Root store initializes', () => {
    const rootStore = new RootStore()
    rootStore.initialize('abcdef', 'test')
})

const testDatedNote = ({
    datedNote,
    date,
    id,
    text,
}: {
    datedNote: DatedObject<Note>
    date: Date
    id: string
    text: string
}) => {
    expect(datedNote).toBeInstanceOf(DatedObject)
    expect(datedNote.date).toBeInstanceOf(Date)
    expect(datedNote.date.getTime()).toBe(new Date(date).getTime())

    const note = datedNote.obj as Note
    expect(note).toBeInstanceOf(Note)

    expect(note.id).toBeInstanceOf(Id)
    expect(note.id.id).toBe(id)
    expect(note.text).toBe(text)
}

const testDatedAnswer = ({
    datedAnswer,
    date,
    id,
    questionId,
    answer,
}: {
    datedAnswer: DatedObject<StretchAnswer>
    date: Date
    id: string
    questionId: string
    answer: string
}) => {
    expect(datedAnswer).toBeInstanceOf(DatedObject)
    expect(datedAnswer.date).toBeInstanceOf(Date)
    expect(datedAnswer.date.getTime()).toBe(new Date(date).getTime())

    const stretchAnswer = datedAnswer.obj as StretchAnswer
    expect(stretchAnswer).toBeInstanceOf(StretchAnswer)

    expect(stretchAnswer.id).toBeInstanceOf(Id)
    expect(stretchAnswer.id.id).toBe(id)
    expect(stretchAnswer.questionId).toBeInstanceOf(Id)
    expect(stretchAnswer.questionId.id).toBe(questionId)
    expect(stretchAnswer.answer).toBe(answer)
}

const testDatedGoal = ({
    datedStatusAndGoals,
    date,
    id,
    status,
    goals,
}: {
    datedStatusAndGoals: DatedObject<StatusAndGoals>
    date: Date
    id: string
    status: string
    goals: IDataGoal[]
}) => {
    expect(datedStatusAndGoals).toBeInstanceOf(DatedObject)
    expect(datedStatusAndGoals.date).toBeInstanceOf(Date)
    expect(datedStatusAndGoals.date.getTime()).toBe(new Date(date).getTime())

    const statusAndGoals = datedStatusAndGoals.obj as StatusAndGoals
    expect(statusAndGoals).toBeInstanceOf(StatusAndGoals)

    expect(statusAndGoals.id).toBeInstanceOf(Id)
    expect(statusAndGoals.id.id).toBe(id)
    expect(statusAndGoals.status).toBe(status)

    for (let i = 0; i < statusAndGoals.goals.length; i++) {
        const goalTarget = goals[i]
        testGoal({
            goal: statusAndGoals.goals[i],
            id: goalTarget._id,
            settingValueId: goalTarget._settingValueId,
            details: goalTarget._details,
            progress: goalTarget._progress,
            links: goalTarget._links,
        })
    }
}

const testGoal = ({
    goal,
    id,
    settingValueId,
    details,
    progress,
    links,
}: {
    goal: Goal
    id: string
    settingValueId: string
    details: string
    progress: number
    links: IDataLink[]
}) => {
    expect(goal).toBeInstanceOf(Goal)
    expect(goal.id).toBeInstanceOf(Id)
    expect(goal.id.id).toBe(id)
    expect(goal.settingValueId).toBeInstanceOf(Id)
    expect(goal.settingValueId.id).toBe(settingValueId)
    expect(goal.details).toBe(details)
    expect(goal.progress).toBe(progress)
    expect(goal.links.length).toBe(links.length)

    for (const link of goal.links) {
        expect(link).toBeInstanceOf(Link)
        expect(link.id).toBeInstanceOf(Id)
        expect(link.target).toBeDefined
        expect(link.text).toBeDefined
    }
}

test('Root store noteStore load is correct with multiple users', () => {
    const rootStore = new RootStore()
    rootStore.initialize('abcdef', 'test')

    let allSavedNotes = rootStore._noteStore.getAllSaved(
        '1234'
    ) as DatedObject<Note>[]
    expect(allSavedNotes.length).toEqual(2)

    testDatedNote({
        datedNote: allSavedNotes[0],
        date: new Date('02/01/2022'),
        id: '8888b',
        text: '<p>Here is the first</p>',
    })
    testDatedNote({
        datedNote: allSavedNotes[1],
        date: new Date('03/01/2022'),
        id: '8888c',
        text: '<p>Here is the second</p>',
    })

    allSavedNotes = rootStore._noteStore.getAllSaved(
        '2345'
    ) as DatedObject<Note>[]

    testDatedNote({
        datedNote: allSavedNotes[0],
        date: new Date('02/02/2022'),
        id: '8888l',
        text: '<p>USER2 - Here is the first</p>',
    })
    testDatedNote({
        datedNote: allSavedNotes[1],
        date: new Date('03/02/2022'),
        id: '8888g',
        text: '<p>USER2 - Here is the second</p>',
    })

    //
    //test the loading of another user
    //
    rootStore.initialize('uvwxyz', 'test')
    allSavedNotes = rootStore._noteStore.getAllSaved(
        '9876'
    ) as DatedObject<Note>[]
    expect(allSavedNotes.length).toEqual(2)

    testDatedNote({
        datedNote: allSavedNotes[0],
        date: new Date('02/01/2022'),
        id: 'b8888',
        text: '<p>other user - first note</p>',
    })
    testDatedNote({
        datedNote: allSavedNotes[1],
        date: new Date('03/01/2022'),
        id: 'c8888',
        text: '<p>other user - second note</p>',
    })
})

test('Root store stretchAnswerStore load is correct', () => {
    const rootStore = new RootStore()
    rootStore.initialize('abcdef', 'test')

    let allSavedAnswers = rootStore._stretchAnswerStore.getAllSaved(
        '1234'
    ) as DatedObject<StretchAnswer>[]

    testDatedAnswer({
        datedAnswer: allSavedAnswers[0],
        date: new Date('02/01/2022'),
        id: '9999b',
        questionId: '1300-20',
        answer: 'Games, I love games',
    })
    testDatedAnswer({
        datedAnswer: allSavedAnswers[1],
        date: new Date('03/01/2022'),
        id: '9999c',
        questionId: '32132148378945231894732',
        answer: 'Here is an answer to a deleted question',
    })

    allSavedAnswers = rootStore._stretchAnswerStore.getAllSaved(
        '2345'
    ) as DatedObject<StretchAnswer>[]

    testDatedAnswer({
        datedAnswer: allSavedAnswers[0],
        date: new Date('02/01/2022'),
        id: '99999b',
        questionId: '1300-30',
        answer: 'No, it sounds horrible!',
    })

    //
    //test the loading of another user
    //
    rootStore.initialize('uvwxyz', 'test')
    allSavedAnswers = rootStore._stretchAnswerStore.getAllSaved(
        '9876'
    ) as DatedObject<StretchAnswer>[]
    expect(allSavedAnswers.length).toEqual(2)

    testDatedAnswer({
        datedAnswer: allSavedAnswers[0],
        date: new Date('02/01/2022'),
        id: 'b9999',
        questionId: '1300-20-2',
        answer: 'other user - games got me into this',
    })
    testDatedAnswer({
        datedAnswer: allSavedAnswers[1],
        date: new Date('03/01/2022'),
        id: 'c9999',
        questionId: '32132148378945231894732-2',
        answer: 'other user - Here is an answer to a deleted question',
    })
})

test('Root store statusAndGoalStore load is correct', () => {
    const rootStore = new RootStore()
    rootStore.initialize('abcdef', 'test')

    let allSavedStatusAndGoals = rootStore._statusAndGoalsStore.getAllSaved(
        '1234'
    ) as DatedObject<StatusAndGoals>[]

    testDatedGoal({
        datedStatusAndGoals: allSavedStatusAndGoals[0],
        date: new Date('02/01/2022'),
        id: '1111sg',
        status: 'Working on new UI for patients',
        goals: [
            {
                _id: '11111g',
                _settingValueId: '1400-20-1',
                _details:
                    'give a presentation on react hooks so that my team can start using them',
                _milestones: [],
                _links: [
                    {
                        _id: '00000l',
                        _text: 'react hooks documentation',
                        _target: 'https://reactjs.org/docs/hooks-intro.html',
                    },
                    {
                        _id: '11111l',
                        _text: 'further hooks info',
                        _target: 'https://reactjs.org/docs/hooks-overview.html',
                    },
                ],
                _progress: 0,
            },
            {
                _id: '22222g',
                _settingValueId: '1400-20-2',
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
    })
})

const testSettingsEntry = ({
    entry,
    id,
    name,
    description,
    type,
}: {
    entry: SettingsEntry
    id: string
    name: string
    description: string
    type: string
}) => {
    expect(entry.id).toBeInstanceOf(Id)
    expect(entry.id.id).toBe(id)
    expect(entry.name).toBe(name)
    expect(entry.description).toBe(description)
    expect(entry.type).toBe(SettingsType[type])
}

const testSettingsValues = (
    values: SettingsValueWithDesc[] | SettingsValue[],
    checkValues: {
        entryId: string
        id: string
        value: string
        description?: string
        deleted?: string
    }[]
) => {
    expect(values.length).toEqual(checkValues.length)
    for (let i = 0; i < values.length; i++) {
        const value = values[i]
        const check = checkValues[i]
        expect(value.id).toBeInstanceOf(Id)
        expect(value.id.id).toBe(check.id)
        expect(value.entryId).toBeInstanceOf(Id)
        expect(value.entryId.id).toBe(check.entryId)
        expect(value.value).toBe(check.value)

        if (value instanceof SettingsValueWithDesc) {
            expect(value.description).toBe(check.description)
        }
        if (value.deleted) {
            expect(value.deleted).toBe(true)
        }
    }
}

test('Root store settings load is correct', () => {
    const rootStore = new RootStore()
    rootStore.initialize('abcdef', 'test')

    expect(() =>
        rootStore._settingsStore.getByEntryName('incorrect entry')
    ).toThrow('getByEntryName: setting not found with name incorrect entry')

    let persistence = rootStore._settingsStore.getByEntryName('persistence')
    testSettingsEntry({
        entry: persistence[0],
        id: '1100',
        name: 'persistence',
        description:
            'what type of persistence would you like to use [local/browser, server]',
        type: 'select',
    })
    testSettingsValues(persistence[1], [
        {
            entryId: '1100',
            id: '1100-10',
            value: 'test',
        },
    ])

    let positions = rootStore._settingsStore.getByEntryName('positions')

    testSettingsEntry({
        entry: positions[0],
        id: '1200',
        name: 'positions',
        description: 'employment-levels for software engineers',
        type: 'multiple',
    })
    testSettingsValues(positions[1], [
        {
            entryId: '1200',
            id: '1200-10',
            value: 'Associate Software Engineer',
            description:
                'Somebody just starting out. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
        },
        {
            entryId: '1200',
            id: '1200-20',
            value: 'Software Engineer',
            description:
                'Somebody who has been at it for a while. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
        },
        {
            entryId: '1200',
            id: '1200-30',
            value: 'Senior Software Engineer',
            description:
                'Should be well versed in a lot of stuff and a good programmer.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
    ])

    let stretch = rootStore._settingsStore.getByEntryName('stretch questions')

    testSettingsEntry({
        entry: stretch[0],
        id: '1300',
        name: 'stretch questions',
        description: 'questions to ask to get to know your reports better',
        type: 'multiple',
    })

    testSettingsValues(stretch[1], [
        {
            entryId: '1300',
            id: '1300-10',
            value: "How do you debug a problem when you're really stuck?",
        },
        {
            entryId: '1300',
            id: '1300-20',
            value: 'What initially got you into coding?',
        },
        {
            entryId: '1300',
            id: '1300-30',
            value: 'Have you ever eaten Vegemite?',
        },
        {
            entryId: '1300',
            id: '32132148378945231894732',
            value: 'This is a deleted question',
            deleted: 'true',
        },
    ])

    //
    // user uvwxyz
    //
    rootStore.initialize('uvwxyz', 'test')

    persistence = rootStore._settingsStore.getByEntryName('persistence')
    testSettingsEntry({
        entry: persistence[0],
        id: '1100',
        name: 'persistence',
        description:
            'what type of persistence would you like to use [local/browser, server]',
        type: 'select',
    })
    testSettingsValues(persistence[1], [
        {
            entryId: '1100',
            id: '1100-10-2',
            value: 'test',
        },
    ])

    positions = rootStore._settingsStore.getByEntryName('positions')

    testSettingsEntry({
        entry: positions[0],
        id: '1200',
        name: 'positions',
        description: 'employment-levels for software engineers',
        type: 'multiple',
    })
    testSettingsValues(positions[1], [
        {
            entryId: '1200',
            id: '1200-10-2',
            value: 'Associate Software Engineer',
            description:
                '[xyz]Somebody just starting out. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
        },
        {
            entryId: '1200',
            id: '1200-20-2',
            value: 'Software Engineer',
            description:
                '[xyz]Somebody who has been at it for a while. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
        },
        {
            entryId: '1200',
            id: '1200-30-2',
            value: 'Senior Software Engineer',
            description:
                '[xyz]Should be well versed in a lot of stuff and a good programmer.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
    ])

    stretch = rootStore._settingsStore.getByEntryName('stretch questions')

    testSettingsEntry({
        entry: stretch[0],
        id: '1300',
        name: 'stretch questions',
        description: 'questions to ask to get to know your reports better',
        type: 'multiple',
    })

    testSettingsValues(stretch[1], [
        {
            entryId: '1300',
            id: '1300-10-2',
            value: "[xyz]How do you debug a problem when you're really stuck?",
        },
        {
            entryId: '1300',
            id: '1300-20-2',
            value: '[xyz]What initially got you into coding?',
        },
        {
            entryId: '1300',
            id: '1300-30-2',
            value: '[xyz]Have you ever eaten Vegemite?',
        },
        {
            entryId: '1300',
            id: '32132148378945231894732-2',
            value: '[xyz]This is a deleted question',
            deleted: 'true',
        },
    ])
})

test('Root store employee load is correct', () => {
    const rootStore = new RootStore()
    rootStore.initialize('abcdef', 'test')
})
