import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useToast,
    Text,
    VStack,
} from '@chakra-ui/react'
import { SelectedEmployeeStore } from '../../stores/SelectedEmployeeStore'
import { Id } from '../../util/Id'
import { Employee } from '../../value_objects/Employee'
import { DetailsForm } from '../DetailsForm'
import {
    useEmployeeStore,
    useNoteStore,
    useSelectedEmployeeStore,
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
    const selectedEmployeeStore = useSelectedEmployeeStore()

    const toast = useToast()

    const updateEmployee = (employee: Employee): void => {
        employeeStore.save(employee)
        selectedEmployeeStore.selectedId = Id.asString(employee.id)
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
        <>
            <Modal isOpen={isDialogOpen} onClose={onDialogClosed}>
                <ModalOverlay />
                <ModalContent maxW="600px">
                    <ModalHeader>enter employee</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack>
                            <Text fontSize="md">
                                to continue, fill out the form below to create
                                an employee to manage
                            </Text>

                            <DetailsForm
                                employee={new Employee()}
                                updateEmployee={updateEmployee}
                                isDialog={true}
                            />
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
