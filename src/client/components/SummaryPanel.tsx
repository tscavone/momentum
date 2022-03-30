import {
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
    Box,
    Grid,
} from '@chakra-ui/react'
import { observer } from 'mobx-react'
import { DatePicker } from './DatePicker'
import {
    useCurrentDateStore,
    useEmployeeStore,
    useSelectedEmployeeStore,
} from './RootStoreProvider'

export const SummaryPanel = observer(() => {
    const selectedEmployeeStore = useSelectedEmployeeStore()
    const employeeStore = useEmployeeStore()
    const currentDateStore = useCurrentDateStore()
    const employeeData = employeeStore.getEmployee(
        selectedEmployeeStore.selectedId
    )

    return (
        <>
            <h2>
                <AccordionButton height={'2px'}>
                    <AccordionIcon />
                </AccordionButton>
            </h2>
            <AccordionPanel pb={4} shadow={'xl'} m={1}>
                <Grid>
                    <Box flex="1" textAlign="left">
                        {`${employeeData.first} ${employeeData.last}'s Summary`}
                    </Box>
                    <DatePicker
                        value={
                            currentDateStore.date.toISOString().split('T')[0]
                        }
                        label='"current" date (demo purposes)'
                        onChange={(event) =>
                            (currentDateStore.date = new Date(
                                event.target.value
                            ))
                        }
                    />
                </Grid>
            </AccordionPanel>
        </>
    )
})
