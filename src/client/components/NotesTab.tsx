//
// this component represents the notes tab in the main application
//
import { useNoteStore, useSelectedEmployeeStore } from './RootStoreProvider'
import escapeHtml from 'escape-html'
import { Text } from 'slate'
import { RichTextBlock } from './RichTextBlock'
import { Box, Button, Checkbox, Flex, Spacer, VStack } from '@chakra-ui/react'
import { Note } from '../value_objects/Note'

export const NotesTab = () => {
    //
    // example data
    //
    const exampleValue = [
        {
            type: 'paragraph',
            children: [
                { text: 'This is editable ' },
                { text: 'rich', bold: true },
                { text: ' text, ' },
                { text: 'much', italic: true },
                { text: ' better than a ' },
                { text: '<textarea>', code: true },
                { text: '!' },
            ],
        },
        {
            type: 'paragraph',
            children: [
                {
                    text: "Since it's rich text, you can do things like turn a selection of text ",
                },
                { text: 'bold', bold: true },
                {
                    text: ', or add a semantically rendered block quote in the middle of the page, like this:',
                },
            ],
        },
        {
            type: 'block-quote',
            children: [{ text: 'A wise quote.' }],
        },
        {
            type: 'paragraph',
            children: [{ text: 'Try it out for yourself!' }],
        },
    ]

    const noteStore = useNoteStore()
    const selectedEmployeeStore = useSelectedEmployeeStore()

    //
    //  Methods that need to go into somewhere
    //
    const serialize = (node: any) => {
        if (Text.isText(node)) {
            let string = escapeHtml(node.text)
            if ((node as any).bold) {
                string = `<strong>${string}</strong>`
            }
            return string
        }

        const children = node.children.map((n) => serialize(n)).join('')

        switch (node.type) {
            case 'block-quote':
                return `<blockquote><p>${children}</p></blockquote>`
            case 'paragraph':
                return `<p>${children}</p>`
            case 'link':
                return `<a href="${escapeHtml(node.url)}">${children}</a>`
            default:
                return children
        }
    }

    const updateCurrentNote = (newValue) => {
        let newNote = new Note()
        newNote.text = newValue.map((n) => serialize(n)).join('')
        noteStore.setCurrent(selectedEmployeeStore.selectedId, newNote)
    }

    const updateNotes = () => {
        let currentDate = selectedEmployeeStore._currentDate
        noteStore.save(
            selectedEmployeeStore.selectedId,
            currentDate ? currentDate : new Date()
        )
    }

    return (
        <VStack>
            <Box w={[250, 500]}>
                <RichTextBlock
                    initialValue={exampleValue}
                    readonly={false}
                    updateCurrentNote={updateCurrentNote}
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
                    <Button onClick={updateNotes}>Save Note</Button>
                </Box>
            </Flex>
        </VStack>
    )
}
