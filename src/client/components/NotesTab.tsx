//
// this component represents the notes tab in the main application
//
import {
    useCurrentDateStore,
    useNoteStore,
    useSelectedEmployeeStore,
} from './RootStoreProvider'
import { RichTextBlock, serialize, deserialize } from './RichTextBlock'
import { Box, Button, Checkbox, Flex, Spacer, VStack } from '@chakra-ui/react'
import { Note } from '../value_objects/Note'
import { observer } from 'mobx-react'

export const NotesTab = observer(() => {
    const noteStore = useNoteStore()
    const selectedEmployeeStore = useSelectedEmployeeStore()
    const currentDateStore = useCurrentDateStore()

    const updateCurrentNote = (newValue) => {
        let newNote = new Note()
        console.log('before serialization:', newValue)
        newNote.text = newValue.map((n) => serialize(n)).join('')
        console.log('after serialization:', newNote.text)
        var parser = new DOMParser()
        var el = parser.parseFromString(newNote.text, 'text/html')
        let deserialized = deserialize(el.body)
        console.log('deserialized', deserialized)
        noteStore.setCurrent(selectedEmployeeStore.selectedId, newNote)
    }

    const updateNotes = () => {
        noteStore.save(
            selectedEmployeeStore.selectedId,
            currentDateStore.date ? currentDateStore.date : new Date()
        )
    }

    const getDeserialized = () => {
        let currentNote = noteStore.getCurrent(
            selectedEmployeeStore.selectedId
        ) as Note
        var parser = new DOMParser()
        var el = parser.parseFromString(currentNote.text, 'text/html')
        let deserialized = deserialize(el.body)

        console.log('deserialized before passing', deserialized)
        return deserialized
    }

    return (
        <VStack>
            <Box w={[250, 500, 750]}>
                <RichTextBlock
                    initialValue={getDeserialized()}
                    readonly={false}
                    updateCurrent={updateCurrentNote}
                />
            </Box>

            <Flex
                alignItems={'center'}
                justifyContent={'flex-end'}
                direction={'row'}
                w={[250, 500, 750]}
            >
                <Spacer />
                <Box p={2}>
                    <Checkbox>private</Checkbox>
                </Box>
                <Box p={2}>
                    <Button onClick={updateNotes} colorScheme="green">
                        save note
                    </Button>
                </Box>
            </Flex>
        </VStack>
    )
})
