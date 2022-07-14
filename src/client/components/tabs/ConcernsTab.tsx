//
// this component represents the notes tab in the main application
//
import { useSelectedEmployeeStore } from '../RootStoreProvider'
import { Box, Button, Flex, useToast } from '@chakra-ui/react'
import { observer } from 'mobx-react'
import { TabPanelContainer } from './TabPanelContainer'

export const ConcernsTab = observer(() => {
    const selectedEmployeeStore = useSelectedEmployeeStore()
    const toast = useToast()

    const updateConcerns = () => {
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
        <TabPanelContainer title="concerns" helpText="" tag="concerns">
            <Box w={[250, 500, 750]}>{/* main content */}</Box>

            <Flex
                alignItems={'center'}
                justifyContent={'flex-end'}
                direction={'row'}
                w={[250, 500, 750]}
            >
                <Box p={2}>
                    <Button onClick={updateConcerns} colorScheme="green">
                        save note
                    </Button>
                </Box>
            </Flex>
        </TabPanelContainer>
    )
})
