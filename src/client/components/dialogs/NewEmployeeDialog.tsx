import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useToast,
} from '@chakra-ui/react'
import { Employee } from '../../value_objects/Employee'
import { DetailsForm } from '../DetailsForm'
import {
    useEmployeeStore,
    useNoteStore,
    useStatusAndGoalsStore,
    useStretchAnswerStore,
} from '../RootStoreProvider'

export const NewEmployeeDialog = ({
    isDialogOpen,
    onDialogClosed,
}: {
    isDialogOpen: boolean
    onDialogClosed: () => void
}) => {
    const notesStore = useNoteStore()
    const stretchStore = useStretchAnswerStore()
    const goalAndStatusStore = useStatusAndGoalsStore()
    const employeeStore = useEmployeeStore()
    const toast = useToast()

    const updateEmployee = (employee: Employee): void => {
        employeeStore.save(employee)
        employeeStore
            .write()
            .then((successfulMessage) => {
                //initialize new employee
                notesStore.addEmployee(employee.id)
                stretchStore.addEmployee(employee.id)
                goalAndStatusStore.addEmployee(employee.id)

                toast({
                    title: successfulMessage,
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                })
            })
            .catch((failureMessage) =>
                toast({
                    title: 'save failed',
                    description: failureMessage,
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                })
            )
            .finally(() => onDialogClosed())
    }

    return (
        <Modal isOpen={isDialogOpen} onClose={onDialogClosed}>
            <ModalOverlay />
            <ModalContent maxW="600px">
                <ModalHeader>settings</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <DetailsForm
                        employee={new Employee()}
                        updateEmployee={updateEmployee}
                        isDialog={true}
                    />
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
