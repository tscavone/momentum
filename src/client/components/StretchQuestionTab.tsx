import {
    Box,
    Button,
    Divider,
    Flex,
    Heading,
    Select,
    VStack,
} from '@chakra-ui/react'
import { observer } from 'mobx-react'
import { computed, makeAutoObservable } from 'mobx'
import { ReactNode } from 'react'
import { DatedObject } from '../util/DatedObject'
import { Id } from '../util/Id'
import { StretchAnswer } from '../value_objects/StretchAnswer'
import { RichTextBlock, serialize, deserialize } from './RichTextBlock'
import {
    useCurrentDateStore,
    useSelectedEmployeeStore,
    useSettingsStore,
    useStretchAnswerStore,
} from './RootStoreProvider'
import { StretchAnswerStore } from '../stores/StretchAnswerStore'
import { SelectedEmployeeStore } from '../stores/SelectedEmployeeStore'

class SelectedQuestionStore {
    _selectedQuestionId: string
    // _shouldBeReadOnly: boolean

    constructor() {
        makeAutoObservable(this)
        this.selectedQuestionId = null
        // this.shouldBeReadOnly = true
    }

    public get selectedQuestionId(): string {
        return this._selectedQuestionId
    }
    public set selectedQuestionId(value: string) {
        this._selectedQuestionId = value
    }
    // public get shouldBeReadOnly(): boolean {
    //     return this._shouldBeReadOnly
    // }
    // public set shouldBeReadOnly(value: boolean) {
    //     this._shouldBeReadOnly = value
    // }

    //null if the selected question has no answer or there's no selected question yet
    getSelectedAnswer(
        stretchAnswerStore: StretchAnswerStore,
        selectedEmployeeStore: SelectedEmployeeStore
    ): StretchAnswer {
        console.log('getting selected answer with id', this.selectedQuestionId)
        if (this.selectedQuestionId === null) return null

        const stretchAnswer = stretchAnswerStore
            .getAllSavedWithCurrent(selectedEmployeeStore.selectedId)
            .filter(
                (answer: StretchAnswer) =>
                    answer.questionId.id === this.selectedQuestionId
            )[0] as StretchAnswer

        return stretchAnswer ? stretchAnswer : null
    }
}
const selectedQuestionStore = new SelectedQuestionStore()

export const StretchQuesitonTab = observer(() => {
    const settingsStore = useSettingsStore()
    const stretchAnswerStore = useStretchAnswerStore()
    const selectedEmployeeStore = useSelectedEmployeeStore()
    const currentDateStore = useCurrentDateStore()

    const shouldBeReadOnly = (): boolean => {
        const current = stretchAnswerStore.getCurrent(
            selectedEmployeeStore.selectedId
        )

        if (!current || !current.questionId) {
            return false
        } else {
            return (
                selectedQuestionStore.selectedQuestionId ===
                current.questionId.id
            )
        }
    }

    const populateStretchQuestions = (): ReactNode[] => {
        const settingsQuestionsValues =
            settingsStore.getByEntryName('stretch questions')[1]
        let answeredQuestions = new Map<string, string>()
        stretchAnswerStore
            .getAllSaved(selectedEmployeeStore.selectedId)
            .forEach((datedObject) => {
                const stretchAnswer = datedObject.obj as StretchAnswer

                answeredQuestions.set(
                    stretchAnswer.questionId.id,
                    stretchAnswer.answer
                )
            })

        let returnValues = settingsQuestionsValues
            .filter((settingQuestionValue) => !settingQuestionValue.deleted)
            .map((settingQuestionValue) => {
                const settingQuestionID = settingQuestionValue.id.id
                const isAnswered = answeredQuestions.delete(settingQuestionID)
                //TODO change from i to classname switch, and also turn if/else into inline logic
                if (isAnswered) {
                    return (
                        <option
                            key={settingQuestionID}
                            style={{ fontStyle: 'italic' }}
                            value={settingQuestionID}
                        >
                            {settingQuestionValue.value + ' |  (answered)'}
                        </option>
                    )
                } else {
                    return (
                        <option
                            key={settingQuestionID}
                            value={settingQuestionID}
                        >
                            {settingQuestionValue.value}
                        </option>
                    )
                }
            })

        answeredQuestions.forEach((value, key) => {
            returnValues.push(
                <option key={key} value={key}>
                    {
                        settingsQuestionsValues.filter(
                            (settingsQuestionValue) =>
                                settingsQuestionValue.id.id === key
                        )[0].value
                    }
                </option>
            )
        })
        return returnValues
    }

    const updateCurrentAnswer = (newValue) => {
        let newAnswer = new StretchAnswer()
        newAnswer.answer = newValue.map((n) => serialize(n)).join('')
        newAnswer.questionId = Id.fromString(
            selectedQuestionStore.selectedQuestionId
        )
        stretchAnswerStore.setCurrent(
            selectedEmployeeStore.selectedId,
            newAnswer
        )
    }

    const updateStretchAnswer = () => {
        stretchAnswerStore.save(
            selectedEmployeeStore.selectedId,
            currentDateStore.date
        )
    }

    const getDeserialized = () => {
        const selectedAnswer = selectedQuestionStore.getSelectedAnswer(
            stretchAnswerStore,
            selectedEmployeeStore
        )
        console.log('gettingDeserialized with selectedAnswer', selectedAnswer)
        if (!selectedAnswer) return undefined

        var parser = new DOMParser()
        var el = parser.parseFromString(selectedAnswer.answer, 'text/html')
        let deserialized = deserialize(el.body.firstChild)

        console.log('deserialized before passing', deserialized)
        return deserialized
    }

    return (
        <Box>
            <VStack>
                <Heading as="h4" size="md">
                    Stretch Questions
                </Heading>
                <Divider orientation="horizontal" />
                <Select
                    value={(function () {
                        console.log(
                            'value for select: ',
                            selectedQuestionStore.selectedQuestionId
                        )
                        return selectedQuestionStore.selectedQuestionId
                    })()}
                    placeholder="Select a stretch question"
                    onChange={(event) => {
                        selectedQuestionStore.selectedQuestionId =
                            event.target.value
                        console.log(
                            'setting changed id: ',
                            event.target.value,
                            ' and after: ',
                            selectedQuestionStore.selectedQuestionId
                        )
                    }}
                >
                    {populateStretchQuestions()}
                </Select>
                <Divider orientation="horizontal" />
                <Box w={[250, 500, 750]}>
                    {(function () {
                        if (!shouldBeReadOnly()) {
                            return (
                                <RichTextBlock
                                    readOnly={false}
                                    updateCurrent={updateCurrentAnswer}
                                    initialValue={getDeserialized()}
                                    renderDependencies={[
                                        selectedQuestionStore._selectedQuestionId,
                                    ]}
                                />
                            )
                        } else {
                            return <p>answer text here </p>
                        }
                    })()}
                </Box>
                <Flex
                    alignItems={'center'}
                    justifyContent={'flex-end'}
                    direction={'row'}
                    w={[250, 500, 750]}
                >
                    <Box p={2}>
                        <Button
                            onClick={updateStretchAnswer}
                            colorScheme="green"
                        >
                            save answer
                        </Button>
                    </Box>
                </Flex>
            </VStack>
        </Box>
    )
})
