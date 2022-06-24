import { Flex, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { NewEmployeeDialog } from './dialogs/NewEmployeeDialog'

export const InitEmployees = () => {
    const { isOpen: isNewEmployeeOpen, onClose: onNewEmployeeClosed } =
        useDisclosure()

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('green.50', 'green.800')}
        >
            <NewEmployeeDialog
                isDialogOpen={isNewEmployeeOpen}
                onDialogClosed={onNewEmployeeClosed}
            />
        </Flex>
    )
}
