//

import {
    Avatar,
    Box,
    Center,
    Container,
    Heading,
    Stack,
    useColorModeValue,
    Text,
} from '@chakra-ui/react'
import { FiEdit } from 'react-icons/fi'
import { Note } from '../../value_objects/Note'
import { ReportContainer } from './ReportContainer'

export const NoteReport = ({ note }: { note: Note }) => {
    return (
        <ReportContainer reportName="note" iconName="FiEdit">
            <Text
                color={'gray.900'}
                dangerouslySetInnerHTML={{ __html: note.text }}
            ></Text>
        </ReportContainer>
    )
}
