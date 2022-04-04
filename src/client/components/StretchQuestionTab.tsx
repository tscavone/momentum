import { Box, Divider, Heading, HStack, Select, VStack } from '@chakra-ui/react'
import { observer } from 'mobx-react'
import { ReactNode } from 'react'
import { StretchAnswer } from '../value_objects/StretchAnswer'
import { RichTextBlock, serialize } from './RichTextBlock'
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

    const populateStretchQuestions = (): ReactNode[] => {
        let answeredQuestions = new Map<string, string>()
        stretchAnswerStore
            .getAllSaved(selectedEmployeeStore.selectedId)
            .forEach((datedObject) => {
                const stretchAnswer = datedObject.obj as StretchAnswer

                answeredQuestions.set(
                    stretchAnswer.question,
                    stretchAnswer.answer
                )
            })

        let returnValues = settingsStore
            .getByEntryName('stretch questions')[1]
            .map((setting) => {
                const isAnswered = answeredQuestions.delete(setting.value)

                //TODO change from i to classname switch, and also turn if/else into inline logic
                if (isAnswered) {
                    return (
                        <option
                            key={setting.id.id}
                            style={{ fontStyle: 'italic' }}
                            disabled
                            value={setting.id.id}
                        >
                            {setting.value + ' |  (answered)'}
                        </option>
                    )
                } else {
                    return (
                        <option key={setting.id.id} value={setting.id.id}>
                            {setting.value}
                        </option>
                    )
                }
            })

        answeredQuestions.forEach((value, key) => {
            returnValues.push(
                <option key={key} value={key}>
                    {value}
                </option>
            )
        })
        return returnValues
    }

    const updateCurrentAnswer = (newValue) => {
        let newAnswer = new StretchAnswer()
        newAnswer.answer = newValue.map((n) => serialize(n)).join('')
        stretchAnswerStore.setCurrent(
            selectedEmployeeStore.selectedId,
            newAnswer
        )
    }

    const updateNotes = () => {
        stretchAnswerStore.save(
            selectedEmployeeStore.selectedId,
            currentDateStore.date
        )
    }
    const defaultInitialValue = [
        {
            type: 'paragraph',
            children: [{ text: '' }],
        },
    ]
    return (
        <Box>
            <VStack>
                <Heading as="h4" size="md">
                    Stretch Questions
                </Heading>
                <Divider orientation="horizontal" />
                <Select>{populateStretchQuestions()}</Select>
                <Divider orientation="horizontal" />
                <Box w={[250, 500, 750]}>
                    <RichTextBlock
                        readonly={false}
                        updateCurrent={updateCurrentAnswer}
                        initialValue={defaultInitialValue}
                    />
                </Box>
            </VStack>
        </Box>
    )
})
