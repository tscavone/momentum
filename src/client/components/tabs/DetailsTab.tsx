//
// this component represents the notes tab in the main application
//
import {
    useEmployeeStore,
    useSelectedEmployeeStore,
} from '../RootStoreProvider'
import { observer } from 'mobx-react'
import { TabPanelContainer } from './TabPanelContainer'
import { DetailsForm } from '../DetailsForm'
import { Employee } from '../../value_objects/Employee'
import { useToast } from '@chakra-ui/react'

export const DetailsTab = observer(() => {
    const selectedEmployeeStore = useSelectedEmployeeStore()
    const employeeStore = useEmployeeStore()

    const toast = useToast()

    const updateEmployee = (employee: Employee): void => {
        employeeStore.save(employee)
        employeeStore
            .write()
            .then((successfulMessage) =>
                toast({
                    title: successfulMessage,
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                })
            )
            .catch((failureMessage) =>
                toast({
                    title: 'save failed',
                    description: failureMessage,
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                })
            )
    }

    return (
        <TabPanelContainer title="details" helpText="" tag="details">
            <DetailsForm
                employee={employeeStore.getEmployee(
                    selectedEmployeeStore.selectedId
                )}
                updateEmployee={updateEmployee}
                isDialog={false}
            />
        </TabPanelContainer>
    )
})
