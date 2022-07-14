import { Flex, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { NewEmployeeDialog } from './dialogs/NewEmployeeDialog'
import { useAuthedUserStore, useSettingsStore } from './RootStoreProvider'

export const InitEmployees = () => {
    const { isOpen: isNewEmployeeOpen, onClose: onNewEmployeeClosed } =
        useDisclosure()

    const settingsStore = useSettingsStore()
    const authedUserStore = useAuthedUserStore()
    settingsStore.load()

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('green.50', 'green.800')}
        >
            <NewEmployeeDialog
                header="to continue, fill out the form below to create
                                an employee to manage"
                isDialogOpen={true}
                onDialogClosed={onNewEmployeeClosed}
                postSaveAction={() => {
                    authedUserStore.needsInit = false
                }}
            />
        </Flex>
    )
}
