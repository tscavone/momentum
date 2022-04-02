import { Text } from 'slate'
import { jsx } from 'slate-hyperscript'

//
//  Methods that need to go into somewhere
//
const serialize = (node) => {
    if (Text.isText(node)) {
        let string = node.text
        if (node.bold) {
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

deserialize2 = (htmlString, markAttributes = {}) => {
    var parser = new DOMParser()
    var el = parser.parseFromString(htmlString, 'text/html')
    if (el.nodeType === Node.TEXT_NODE) {
        return jsx('text', markAttributes, el.textContent)
    } else if (el.nodeType !== Node.ELEMENT_NODE) {
        return null
    }

    const nodeAttributes = { ...markAttributes }

    // define attibutes for text nodes
    switch (el.nodeName) {
        case 'strong':
            nodeAttributes.bold = true
    }

    const children = Array.from(el.childNodes)
        .map((node) => deserialize(el, nodeAttributes))
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

let str = '<p>here is some text<p>'
