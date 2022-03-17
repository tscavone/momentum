//
// this component represents the notes tab in the main application
//

import { Id } from '../util/Id'
import { useNoteStore, useSelectedEmployeeStore } from './RootStoreProvider'
import escapeHtml from 'escape-html'
import { Text } from 'slate'
import { RichTextBlock } from './RichTextBlock'
import { Box, Button, VStack } from '@chakra-ui/react'
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
        let id = new Id()
        id.id = selectedEmployeeStore.selectedId
        let newNote = new Note()
        newNote.text = newValue.map((n) => serialize(n)).join('')
        noteStore.setCurrent(id, newNote)
    }

    const updateNotes = () => {
        let id = new Id()
        id.id = selectedEmployeeStore.selectedId
        let currentDate = selectedEmployeeStore._currentDate
        noteStore.save(id, currentDate ? currentDate : new Date())
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
            <Button onClick={updateNotes}>Save Note</Button>
        </VStack>
    )
}
