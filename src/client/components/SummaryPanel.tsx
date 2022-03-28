import {
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
    Box,
} from '@chakra-ui/react'
import { observer } from 'mobx-react'
import { useEmployeeStore, useSelectedEmployeeStore } from './RootStoreProvider'

export const SummaryPanel = observer(() => {
    const selectedEmployeeStore = useSelectedEmployeeStore()
    const employeeStore = useEmployeeStore()

    const employeeData = employeeStore.getEmployee(
        selectedEmployeeStore.selectedId
    )

    return (
        <>
            <h2>
                <AccordionButton>
                    <Box flex="1" textAlign="left">
                        {`${employeeData.first} ${employeeData.last}'s Summary`}
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
            </h2>
            <AccordionPanel pb={4}></AccordionPanel>
        </>
    )
})
