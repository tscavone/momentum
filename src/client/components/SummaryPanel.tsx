import {
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
    Box,
    Grid,
    Text,
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
                <AccordionButton height={'2px'} p={'12px 12px 16px 12px'}>
                    <AccordionIcon />
                    <Text size="l">activity summary</Text>
                </AccordionButton>
            </h2>
            <AccordionPanel pb={4} m={1}>
                <Grid>
                    <DatePicker
                        value={
                            currentDateStore.date
                                ? currentDateStore.date
                                      .toISOString()
                                      .split('T')[0]
                                : ''
                        }
                        label='"current" date (demo purposes)'
                        onChange={(event) => {
                            if (event.target.value)
                                currentDateStore.date = new Date(
                                    event.target.value
                                )
                            else currentDateStore.date = null
                        }}
                    />
                </Grid>
            </AccordionPanel>
        </>
    )
})
