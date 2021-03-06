import { Box, Button, Flex, Select, Textarea, useToast } from '@chakra-ui/react'
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
import { TabPanelContainer } from './TabPanelContainer'

class SelectedQuestionStore {
    _selectedQuestionId: string

    constructor() {
        makeAutoObservable(this, {
            _selectedQuestionId: observable,
        })
        this.selectedQuestionId = null
    }

    public get selectedQuestionId(): string {
        return this._selectedQuestionId
    }
    public set selectedQuestionId(value: string) {
        this._selectedQuestionId = value
    }

    //null if the selected question has no answer or there's no selected question yet
    getSelectedAnswer(
        stretchAnswerStore: StretchAnswerStore,
        selectedEmployeeStore: SelectedEmployeeStore
    ): StretchAnswer {
        if (this.selectedQuestionId === null) return null

        const stretchAnswer = stretchAnswerStore
            .getAllSaved(selectedEmployeeStore.selectedId)
            .filter((answer: DatedObject<StretchAnswer>) => {
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
    const toast = useToast()

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
            ?.map((settingQuestionValue) => {
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
    }

    const saveStretchAnswer = () => {
        stretchAnswerStore
            .save(
                selectedEmployeeStore.selectedId,
                currentDateStore.date,
                new StretchAnswer()
            )
            .then((successfulMessage) =>
                toast({
                    title: successfulMessage,
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                })
            )
            .catch((failureMessage) =>
                toast({
                    title: 'save failed',
                    description: failureMessage,
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                })
            )
    }

    const getValue = () => {
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

    return (
        <TabPanelContainer title="stretch questions" helpText="" tag="stretch">
            <Box w={[250, 500, 750]} mb={4}>
                <Select
                    value={(function () {
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
            </Box>
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
        </TabPanelContainer>
    )
})
