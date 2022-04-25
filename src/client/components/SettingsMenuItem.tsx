import {
    Box,
    Button,
    FormControl,
    MenuItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react'
import { SettingsEntry } from '../value_objects/SettingsEntry'
import { SettingsValue } from '../value_objects/SettingsValue'
import { SettingsInput } from './SettingsInput'

export const SettingsMenuItem = ({
    settings,
}: {
    settings: Map<string, [SettingsEntry, SettingsValue[]]>
}) => {
    const {
        isOpen: isSettingsOpen,
        onOpen: onSettingsOpen,
        onClose: onSettingsClosed,
    } = useDisclosure()

    const removeValue = (event) => {
        event.preventDefault()
        console.log('---- removing: ', event.target.value)
    }
    const addValue = (event) => {
        event.preventDefault()
        console.log(event)
    }

    return (
        <>
            <MenuItem
                data-testid="openSettingsMenuDialog"
                onClick={onSettingsOpen}
            >
                settings
            </MenuItem>

            <Modal isOpen={isSettingsOpen} onClose={onSettingsClosed}>
                <ModalOverlay />
                <ModalContent maxW="48rem">
                    <ModalHeader>settings</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            {Array.from(settings.entries()).map(
                                (settingsEntry) => {
                                    return (
                                        <Box
                                            p="2"
                                            key={'box' + settingsEntry[0]}
                                        >
                                            <SettingsInput
                                                settingsEntryAndValues={
                                                    settingsEntry[1]
                                                }
                                                removeValue={removeValue}
                                                addValue={addValue}
                                            ></SettingsInput>
                                        </Box>
                                    )
                                }
                            )}
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="green"
                            mr={3}
                            onClick={onSettingsClosed}
                        >
                            save
                        </Button>
                        <Button variant="ghost">close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
