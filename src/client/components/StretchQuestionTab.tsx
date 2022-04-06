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
import { ReactNode, useEffect, useState } from 'react'
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

export const StretchQuesitonTab = observer(() => {
    const settingsStore = useSettingsStore()
    const stretchAnswerStore = useStretchAnswerStore()
    const selectedEmployeeStore = useSelectedEmployeeStore()
    const currentDateStore = useCurrentDateStore()

    const [selectedQuestionId, setSelectedQuestionId] = useState(null)

    //null if the selected question has no answer or there's no selected question yet
    const getSelectedAnswer = (): StretchAnswer => {
        if (selectedQuestionId === null) return null

        const stretchAnswer = stretchAnswerStore
            .getAllSaved(selectedEmployeeStore.selectedId)
            .filter(
                (datedAnswer: DatedObject<StretchAnswer>) =>
                    datedAnswer.obj.questionId === selectedQuestionId
            )[0] as DatedObject<StretchAnswer>

        return stretchAnswer ? stretchAnswer.obj : null
    }

    const shouldBeReadOnly = (): boolean => {
        return getSelectedAnswer() !== null
    }

    const [richTextReadOnly, setRichTextReadOnly] = useState(shouldBeReadOnly())

    useEffect(() => {
        if (selectedQuestionId !== null) {
            const selectedAnswer = getSelectedAnswer()
            if (!selectedAnswer) {
                stretchAnswerStore.getCurrent(
                    selectedEmployeeStore.selectedId
                ).questionId = selectedQuestionId
            }
        }
        setRichTextReadOnly(shouldBeReadOnly())
    }, [selectedQuestionId, shouldBeReadOnly])

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
        console.log('answeredQuestions', answeredQuestions)
        console.log(
            'questions',
            settingsStore.getByEntryName('stretch questions')[1]
        )

        let returnValues = settingsQuestionsValues
            .filter((settingQuestionValue) => !settingQuestionValue.deleted)
            .map((settingQuestionValue) => {
                const settingQuestionID = settingQuestionValue.id.id
                const isAnswered = answeredQuestions.delete(settingQuestionID)
                console.log('settingQuestion id', settingQuestionID)
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
        newAnswer.questionId = Id.fromString(selectedQuestionId)
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
        const selectedAnswer = getSelectedAnswer()
        if (!selectedAnswer) return selectedAnswer

        var parser = new DOMParser()
        var el = parser.parseFromString(selectedAnswer.answer, 'text/html')
        let deserialized = deserialize(el.body)

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
                    value={selectedQuestionId}
                    placeholder="Select a stretch question"
                    onChange={(event) =>
                        setSelectedQuestionId(event.target.value)
                    }
                >
                    {populateStretchQuestions()}
                </Select>
                <Divider orientation="horizontal" />
                <Box w={[250, 500, 750]}>
                    <RichTextBlock
                        readOnly={richTextReadOnly}
                        updateCurrent={updateCurrentAnswer}
                        initialValue={getDeserialized()}
                        renderDependencies={[selectedQuestionId]}
                    />
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
