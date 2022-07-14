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
import { Id } from '../../util/Id'
import { Employee } from '../../value_objects/Employee'
import { DetailsForm } from '../DetailsForm'
import {
    useEmployeeStore,
    useFollowUpStore,
    useNoteStore,
    useSelectedEmployeeStore,
    useStatusAndGoalsStore,
    useStretchAnswerStore,
} from '../RootStoreProvider'

export const NewEmployeeDialog = ({
    header,
    isDialogOpen,
    onDialogClosed,
    postSaveAction,
}: {
    header: string
    isDialogOpen: boolean
    onDialogClosed: () => void
    postSaveAction?: () => void
}) => {
    const notesStore = useNoteStore()
    const stretchStore = useStretchAnswerStore()
    const goalAndStatusStore = useStatusAndGoalsStore()
    const employeeStore = useEmployeeStore()
    const selectedEmployeeStore = useSelectedEmployeeStore()
    const followUpStore = useFollowUpStore()

    const toast = useToast()

    const updateEmployee = (employee: Employee): void => {
        selectedEmployeeStore.selectedId = Id.asString(employee.id)
        employeeStore.save(employee)
        employeeStore
            .write()
            .then(() => {
                const promises: Promise<string>[] = []
                notesStore.addEmployee(employee.id)
                stretchStore.addEmployee(employee.id)
                goalAndStatusStore.addEmployee(employee.id)
                followUpStore.addEmployee(employee.id)
                selectedEmployeeStore.selectedId = Id.asString(employee.id)

                promises.push(
                    selectedEmployeeStore.write(),
                    notesStore.write(),
                    stretchStore.write(),
                    goalAndStatusStore.write(),
                    followUpStore.write()
                )

                return Promise.all(promises)
            })
            .then(() => {
                if (postSaveAction) postSaveAction()
                toast({
                    title: 'employee added',
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
                            <Text fontSize="md">{header}</Text>

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
