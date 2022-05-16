//
// this component represents the notes tab in the main application
//
import { useSelectedEmployeeStore } from '../RootStoreProvider'
import {
    Box,
    Button,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    useToast,
    VStack,
} from '@chakra-ui/react'
import { observer } from 'mobx-react'
import { TabPanelContainer } from './TabPanelContainer'
import { DetailsForm } from '../DetailsForm'

export const DetailsTab = observer(() => {
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
        <TabPanelContainer title="details" helpText="" tag="details">
            <Box w={[250, 500, 750]}>
                <DetailsForm />
            </Box>

            <Flex
                alignItems={'center'}
                justifyContent={'flex-end'}
                direction={'row'}
                w={[250, 500, 750]}
            >
                <Box p={2}>
                    <Button onClick={updateDetails} colorScheme="green">
                        save details
                    </Button>
                </Box>
            </Flex>
        </TabPanelContainer>
    )
})
