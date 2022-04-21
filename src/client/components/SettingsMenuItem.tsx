import {
    Button,
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

export const SettingsMenuItem = () => {
    //settings dialog
    const {
        isOpen: isSettingsOpen,
        onOpen: onSettingsOpen,
        onClose: onSettingsClosed,
    } = useDisclosure()
    return (
        <>
            <MenuItem onClick={onSettingsOpen}>settings</MenuItem>

            <Modal isOpen={isSettingsOpen} onClose={onSettingsClosed}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Here is a bunch of modal text Here is a bunch of modal
                        text Here is a bunch of modal text Here is a bunch of
                        modal text
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="green"
                            mr={3}
                            onClick={onSettingsClosed}
                        >
                            Close
                        </Button>
                        <Button variant="ghost">Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
