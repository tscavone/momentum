import { RootStore } from '../client/stores/RootStore'
import { DatedObject } from '../client/util/DatedObject'
import { Id } from '../client/util/Id'
import { IdentifiedObject } from '../client/util/IdentifiedObject'
import { Note } from '../client/value_objects/Note'
import { StretchAnswer } from '../client/value_objects/StretchAnswer'

test('Root store constructs', () => {
    const rootStore = new RootStore()
})

test('Root store initializes', () => {
    const rootStore = new RootStore()
    rootStore.initialize()
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

test('Root store noteStore load is correct', () => {
    const rootStore = new RootStore()
    rootStore.initialize()

    let allSavedNotes = rootStore._noteStore.getAllSaved(
        '1234'
    ) as DatedObject<Note>[]
    expect(allSavedNotes.length).toEqual(2)

    testDatedNote({
        datedNote: allSavedNotes[0],
        date: new Date('02/01/2022'),
        id: '8888b',
        text: 'Here is the first',
    })
    testDatedNote({
        datedNote: allSavedNotes[1],
        date: new Date('03/01/2022'),
        id: '8888c',
        text: 'Here is the second',
    })

    allSavedNotes = rootStore._noteStore.getAllSaved(
        '2345'
    ) as DatedObject<Note>[]

    testDatedNote({
        datedNote: allSavedNotes[0],
        date: new Date('02/02/2022'),
        id: '8888l',
        text: 'USER2 - Here is the first',
    })
    testDatedNote({
        datedNote: allSavedNotes[1],
        date: new Date('03/02/2022'),
        id: '8888g',
        text: 'USER2 - Here is the second',
    })
})

test('Root store stretchAnswerStore load is correct', () => {
    const rootStore = new RootStore()
    rootStore.initialize()
    let allSavedAnswers = rootStore._stretchAnswerStore.getAllSaved(
        '1234'
    ) as DatedObject<StretchAnswer>[]

    testDatedAnswer({
        datedAnswer: allSavedAnswers[0],
        date: new Date('02/01/2022'),
        id: '9999b',
        questionId: '1300-20',
        answer: '<p>Games, I love games</p>',
    })
    testDatedAnswer({
        datedAnswer: allSavedAnswers[1],
        date: new Date('03/01/2022'),
        id: '9999c',
        questionId: '32132148378945231894732',
        answer: '<p>Here is an answer to a deleted question</p>',
    })

    allSavedAnswers = rootStore._stretchAnswerStore.getAllSaved(
        '2345'
    ) as DatedObject<StretchAnswer>[]

    testDatedAnswer({
        datedAnswer: allSavedAnswers[0],
        date: new Date('02/01/2022'),
        id: '99999b',
        questionId: '1300-30',
        answer: '<p>No, it sounds horrible!</p>',
    })

    allSavedAnswers = rootStore._stretchAnswerStore.getAllSaved(
        '1234'
    ) as DatedObject<StretchAnswer>[]
})

/*
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



*/
