import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    HStack,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Spacer,
    useBoolean,
    useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import {
    useFollowUpStore,
    useSelectedEmployeeStore,
} from '../RootStoreProvider'

export const NewFollowUpDialog = ({
    isDialogOpen,
    onDialogClosed,
}: {
    isDialogOpen: boolean
    onDialogClosed: () => void
}) => {
    const followUpStore = useFollowUpStore()
    const currentEmployee = useSelectedEmployeeStore()
    const toast = useToast()
    let [checked, setChecked] = useBoolean(false)
    let [text, setText] = useState<string>()

    const followUp = () => addFollowUp()
    const followUpAndClose = () => addFollowUp(true)
    const addFollowUp = (closeDialog: boolean = false) => {
        followUpStore
            .add(text, checked ? null : currentEmployee.selectedId)
            .then(() => {
                toast({
                    title: 'follow up added',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                })
            })
            .catch((e) => {
                toast({
                    title: `followup not added: ${e}`,
                    status: 'error',
                    duration: 10000,
                    isClosable: true,
                })
            })

        if (closeDialog) onDialogClosed()
    }

    return (
        <Modal isOpen={isDialogOpen} onClose={onDialogClosed}>
            <ModalOverlay />
            <ModalContent maxW="600px">
                <ModalHeader>new followup</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box w={[250, 500]}>
                        <HStack>
                            <FormControl colorScheme={'green'}>
                                <Input
                                    type="text"
                                    placeholder="followup description"
                                    onChange={(e) => setText(e.target.value)}
                                ></Input>
                            </FormControl>
                            <Checkbox
                                colorScheme="green"
                                onChange={() => setChecked.toggle()}
                            >
                                global
                            </Checkbox>
                        </HStack>
                        <Flex
                            alignItems={'center'}
                            justifyContent={'flex-end'}
                            direction={'row'}
                            w={[250, 500]}
                        >
                            <Spacer />
                            <Box p={2}>
                                <Button onClick={followUp}>
                                    add follow up
                                </Button>
                            </Box>
                            <Box p={2}>
                                <Button
                                    onClick={followUpAndClose}
                                    colorScheme="green"
                                >
                                    add and close
                                </Button>
                            </Box>
                        </Flex>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
