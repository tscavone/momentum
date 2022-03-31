import React, { useCallback, useMemo, useState } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, Slate, ReactEditor } from 'slate-react'
import { Editor, Transforms, createEditor, Node, Text } from 'slate'
import { withHistory } from 'slate-history'
import { Box } from '@chakra-ui/react'
import { Element, Leaf, toggleMark, Toolbar } from './RichTextSubComponents'
import escapeHtml from 'escape-html'
import { jsx } from 'slate-hyperscript'

// @refresh reset
const HOTKEYS: { [hotkey: string]: string } = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code',
}

export interface RichTextBlockProps {
    initialValue?: any
    readonly: any
    updateCurrent: any
}

export const serialize = (node: any) => {
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
            return `<blockquote class="blockquote"><p>${children}</p></blockquote>`
        case 'paragraph':
            return `<p>${children}</p>`
        case 'link':
            return `<a href="${escapeHtml(node.url)}">${children}</a>`
        default:
            return children
    }
}

/*
export const deserialize = (el, markAttributes = {}) => {
    if (el.nodeType === Node.TEXT_NODE) {
        return jsx('text', markAttributes, el.textContent)
    } else if (el.nodeType !== Node.ELEMENT_NODE) {
        return null
    }

    const nodeAttributes: any = { ...markAttributes }

    // define attibutes for text nodes
    switch (el.nodeName) {
        case 'strong':
            nodeAttributes.bold = true
    }

    const children = Array.from(el.childNodes)
        .map((node) => deserialize(node, nodeAttributes))
        .flat()

    if (children.length === 0) {
        children.push(jsx('text', nodeAttributes, ''))
    }

    switch (el.nodeName) {
        case 'BODY':
            return jsx('fragment', {}, children)
        case 'BR':
            return '\n'
        case 'BLOCKQUOTE':
            return jsx('element', { type: 'quote' }, children)
        case 'P':
            return jsx('element', { type: 'paragraph' }, children)
        case 'A':
            return jsx(
                'element',
                { type: 'link', url: el.getAttribute('href') },
                children
            )
        default:
            return children
    }
}
*/

export const RichTextBlock: React.FC<RichTextBlockProps> = ({
    initialValue,
    readonly,
    updateCurrent,
}) => {
    const defaultInitialValue = [
        {
            type: 'paragraph',
            children: [{ text: '' }],
        },
    ]

    initialValue = initialValue ? initialValue : defaultInitialValue
    console.log('Rich Text Initial value: ', initialValue)
    const [value, setValue] = useState<Node[]>(initialValue)
    const renderElement = useCallback((props) => <Element {...props} />, [])
    const renderLeaf = useCallback((props) => <Leaf {...props} />, [])
    const editor = useMemo(
        () =>
            withHistory(withReact<ReactEditor>(createEditor() as ReactEditor)),
        []
    )

    //focus selection
    const [focused, setFocused] = React.useState(false)
    const savedSelection = React.useRef(editor.selection)

    const onFocus = React.useCallback(() => {
        setFocused(true)
        if (!editor.selection && value?.length) {
            Transforms.select(
                editor,
                savedSelection.current ?? Editor.end(editor, [])
            )
        }
    }, [editor])

    const onBlur = React.useCallback(() => {
        setFocused(false)
        savedSelection.current = editor.selection
    }, [editor])

    const divRef = React.useRef<HTMLDivElement>(null)

    const focusEditor = React.useCallback(
        (e: React.MouseEvent) => {
            if (e.target === divRef.current) {
                ReactEditor.focus(editor)
                e.preventDefault()
            }
        },
        [editor]
    )

    const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event as any)) {
                event.preventDefault()
                const mark = HOTKEYS[hotkey]
                toggleMark(editor, mark)
            }
        }
    }

    const style = readonly
        ? { maxHeight: '200px', overflow: 'auto' }
        : { minHeight: '150px', resize: 'vertical', overflow: 'auto' }

    return (
        <Box ref={divRef} onMouseDown={focusEditor} borderWidth={'1px'}>
            <Slate
                editor={editor}
                value={value}
                onChange={(newValue) => {
                    setValue(newValue)
                    updateCurrent(newValue)
                    console.log('current set:  ', newValue)
                }}
            >
                {readonly ? <></> : <Toolbar />}
                <Box padding={'15px 5px'}>
                    <Editable
                        readOnly={readonly}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onKeyDown={onKeyDown}
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        placeholder={readonly ? '' : 'Enter some rich text…'}
                        spellCheck
                        style={{
                            minHeight: '150px',
                            resize: 'vertical',
                            overflow: 'auto',
                        }}
                    />
                </Box>
            </Slate>
        </Box>
    )
}
