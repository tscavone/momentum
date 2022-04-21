import {
    Box,
    Button,
    Divider,
    Flex,
    Heading,
    Select,
    Textarea,
    VStack,
} from '@chakra-ui/react'
import { observer } from 'mobx-react'
import { makeAutoObservable, observable } from 'mobx'
import { ReactNode } from 'react'
import { DatedObject } from '../../util/DatedObject'
import { Id } from '../../util/Id'
import { StretchAnswer } from '../../value_objects/StretchAnswer'
import {
    useCurrentDateStore,
    useSelectedEmployeeStore,
    useSettingsStore,
    useStretchAnswerStore,
} from '../RootStoreProvider'
import { StretchAnswerStore } from '../../stores/StretchAnswerStore'
import { SelectedEmployeeStore } from '../../stores/SelectedEmployeeStore'

class SelectedQuestionStore {
    _selectedQuestionId: string
    // _shouldBeReadOnly: boolean

    constructor() {
        makeAutoObservable(this, {
            _selectedQuestionId: observable,
        })
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
            .getAllSaved(selectedEmployeeStore.selectedId)
            .filter((answer: DatedObject<StretchAnswer>) => {
                console.log('\tchecking against', answer.obj.questionId.id)
                return answer.obj.questionId.id === this.selectedQuestionId
            })[0]

        if (stretchAnswer) {
            console.log('selected stretch answer', stretchAnswer.obj.answer)
        }
        return stretchAnswer ? stretchAnswer.obj : null
    }
}
const selectedQuestionStore = new SelectedQuestionStore()

export const StretchQuesitonTab = observer(() => {
    const settingsStore = useSettingsStore()
    const stretchAnswerStore = useStretchAnswerStore()
    const selectedEmployeeStore = useSelectedEmployeeStore()
    const currentDateStore = useCurrentDateStore()

    const shouldBeReadOnly = (): boolean => {
        const selectedAnswer = selectedQuestionStore.getSelectedAnswer(
            stretchAnswerStore,
            selectedEmployeeStore
        )

        return selectedAnswer !== null
    }

    const populateStretchQuestions = (): ReactNode[] => {
        //get all stretch questions for this user
        const settingsQuestionsValues =
            settingsStore.getByEntryName('stretch questions')[1]
        let answeredQuestions = new Map<string, string>()

        //make a map of all the questions that have answers
        stretchAnswerStore
            .getAllSaved(selectedEmployeeStore.selectedId)
            .forEach((datedObject) => {
                const stretchAnswer = datedObject.obj as StretchAnswer

                answeredQuestions.set(
                    stretchAnswer.questionId.id,
                    stretchAnswer.answer
                )
            })

        //for all not deleted answers, render the question value in the select dropdown with
        //specific styling to let the user know that the employee has answered this question.  Also,
        //delete such questions from the set of answeredQuestions.  This will leave only answers that correspond to
        //deleted questions
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

        //for any deleted questions
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

    const updateCurrentAnswer = (e) => {
        //todo - is there a way to do this without adding a new object every time?

        let newAnswer = new StretchAnswer()
        newAnswer.answer = e.target.value
        newAnswer.questionId = Id.fromString(
            selectedQuestionStore.selectedQuestionId
        )
        stretchAnswerStore.setCurrent(
            selectedEmployeeStore.selectedId,
            newAnswer
        )
        // stretchAnswerStore.getCurrent(selectedEmployeeStore.selectedId).answer =
        //     e.target.value
        // //todo - cache id somehow?
        // stretchAnswerStore.getCurrent(
        //     selectedEmployeeStore.selectedId
        // ).questionId = Id.fromString(selectedQuestionStore.selectedQuestionId)
    }

    const saveStretchAnswer = () => {
        stretchAnswerStore.save(
            selectedEmployeeStore.selectedId,
            currentDateStore.date
        )
        stretchAnswerStore.setCurrent(
            selectedEmployeeStore.selectedId,
            new StretchAnswer()
        )
        console.log(
            'saved stretch answers: ',
            stretchAnswerStore.getAllSaved(selectedEmployeeStore.selectedId)
        )
    }

    const getValue = () => {
        console.log('Get Value called')
        let newValue = selectedQuestionStore.getSelectedAnswer(
            stretchAnswerStore,
            selectedEmployeeStore
        )
            ? selectedQuestionStore.getSelectedAnswer(
                  stretchAnswerStore,
                  selectedEmployeeStore
              ).answer
            : null

        return newValue
            ? newValue
            : stretchAnswerStore.getCurrent(selectedEmployeeStore.selectedId)
                  .answer
    }

    // const getValue = () => {
    //     let selectedAnswer = selectedQuestionStore.getSelectedAnswer(
    //         stretchAnswerStore,
    //         selectedEmployeeStore
    //     )
    //     console.log('HERE IS GET VALUE selected ANSWER ', selectedAnswer)
    //     if (selectedAnswer !== null) {
    //         return selectedAnswer.answer
    //     }

    //     let currentAnswer = stretchAnswerStore.getCurrent(
    //         selectedEmployeeStore.selectedId
    //     ).answer

    //     console.log('HERE IS GET VALUE CURRENT ANSWER ', currentAnswer)
    //     //if current answer is null, we want to return '' to clear the input
    //     return currentAnswer ? currentAnswer : ''
    // }
    return (
        <Box>
            <VStack>
                <Heading as="h4" size="md">
                    stretch questions
                </Heading>
                <Divider orientation="horizontal" />
                <Select
                    w={[250, 500, 750]}
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

                        stretchAnswerStore.getCurrent(
                            selectedEmployeeStore.selectedId
                        ).questionId.id = event.target.value
                    }}
                >
                    {populateStretchQuestions()}
                </Select>
                <Box w={[250, 500, 750]}>
                    <Textarea
                        colorScheme={'green'}
                        value={getValue()}
                        onChange={updateCurrentAnswer}
                        isReadOnly={shouldBeReadOnly()}
                        className={
                            shouldBeReadOnly()
                                ? 'readonly-textarea'
                                : 'editable-textarea'
                        }
                    ></Textarea>
                </Box>
                <Flex
                    alignItems={'center'}
                    justifyContent={'flex-end'}
                    direction={'row'}
                    w={[250, 500, 750]}
                >
                    <Box p={2}>
                        <Button
                            onClick={saveStretchAnswer}
                            disabled={stretchAnswerStore
                                .getCurrent(selectedEmployeeStore.selectedId)
                                .isNewlyMinted()}
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
