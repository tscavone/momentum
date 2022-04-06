//

import { Container } from '@chakra-ui/react'
import { Note } from '../../value_objects/Note'

// a component to display a Note in the report drawer
export const NoteReport = ({ note }: { note: Note }) => {
    return (
        <Container
            p={5}
            shadow="md"
            borderWidth="1px"
            w={[250, 500]}
            borderRadius="md"
            dangerouslySetInnerHTML={{ __html: note.text }}
        ></Container>
    )
}
