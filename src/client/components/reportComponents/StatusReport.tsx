//

import {
    Container,
    Text,
    Tag,
    TagLabel,
    TagRightIcon,
    VStack,
} from '@chakra-ui/react'
import { FiInbox } from 'react-icons/fi'

// a component to display a Note in the report drawer
export const StatusReport = ({ status }: { status: string }) => {
    return (
        <Container
            p={5}
            shadow="md"
            borderWidth="1px"
            w={[250, 500]}
            borderRadius="md"
        >
            {' '}
            <VStack>
                <Tag
                    size={'md'}
                    key={'md'}
                    variant="outline"
                    colorScheme="green"
                >
                    <TagLabel>status</TagLabel>
                    <TagRightIcon as={FiInbox} />
                </Tag>
                <Text>status</Text>
            </VStack>
        </Container>
    )
}
