//
// this component represents the notes tab in the main application
//
import { useSelectedEmployeeStore } from '../RootStoreProvider'
import {
    Box,
    Button,
    Divider,
    Flex,
    Heading,
    HStack,
    useToast,
    VStack,
} from '@chakra-ui/react'
import { Note } from '../../value_objects/Note'
import { observer } from 'mobx-react'

export const NotesTab = observer(() => {
    const selectedEmployeeStore = useSelectedEmployeeStore()
    const toast = useToast()

    const updateDetails = () => {
        // noteStore
        //     .save(
        //         selectedEmployeeStore.selectedId,
        //         currentDateStore.date ? currentDateStore.date : new Date(),
        //         new Note()
        //     )
        //     .then((successfulMessage) =>
        //         toast({
        //             title: successfulMessage,
        //             status: 'success',
        //             duration: 2000,
        //             isClosable: true,
        //         })
        //     )
        //     .catch((failureMessage) =>
        //         toast({
        //             title: 'save failed',
        //             description: failureMessage,
        //             status: 'error',
        //             duration: 2000,
        //             isClosable: true,
        //         })
        //     )
    }

    return (
        <HStack>
            <VStack>
                <Heading as="h4" size="md">
                    notes
                </Heading>
                <Divider orientation="horizontal" />
                <Box w={[250, 500, 750]}>{/* main content */}</Box>

                <Flex
                    alignItems={'center'}
                    justifyContent={'flex-end'}
                    direction={'row'}
                    w={[250, 500, 750]}
                >
                    <Box p={2}>
                        <Button onClick={updateDetails} colorScheme="green">
                            save note
                        </Button>
                    </Box>
                </Flex>
            </VStack>
        </HStack>
    )
})
