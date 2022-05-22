import {
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
    FormControl,
    FormLabel,
    Input,
    SimpleGrid,
    Text,
} from '@chakra-ui/react'
import { observer } from 'mobx-react'
import { DatePicker } from './subcomponents/DatePicker'
import {
    useCurrentDateStore,
    useEmployeeStore,
    useSelectedEmployeeStore,
    useStatusAndGoalsStore,
} from './RootStoreProvider'

export const SummaryPanel = observer(() => {
    const selectedEmployeeStore = useSelectedEmployeeStore()
    const employeeStore = useEmployeeStore()
    const currentDateStore = useCurrentDateStore()
    const statusAndGoalsStore = useStatusAndGoalsStore()
    const employeeData = employeeStore.getEmployee(
        selectedEmployeeStore.selectedId
    )

    return (
        <>
            <h2>
                <AccordionButton height={'2px'} p={'12px 12px 16px 12px'}>
                    <AccordionIcon />
                    <Text size="xl" fontWeight={'bold'}>
                        activity summary
                    </Text>
                </AccordionButton>
            </h2>
            <AccordionPanel pb={4} m={1}>
                <SimpleGrid columns={2} spacingX={10} spacingY={4}>
                    <FormControl variant={'floating500'}>
                        <FormLabel>current status</FormLabel>
                        <Input
                            readOnly
                            color={'white'}
                            value="foo"
                            // value={
                            //     statusAndGoalsStore.getCurrent(
                            //         selectedEmployeeStore.selectedId
                            //     ).status
                            // }
                        ></Input>
                    </FormControl>
                    <FormControl variant={'floating500'}>
                        <FormLabel>current issues</FormLabel>
                        <Input
                            readOnly
                            color={'white'}
                            value="too many meetings, frustrated on current project"
                            // value={
                            //     statusAndGoalsStore.getCurrent(
                            //         selectedEmployeeStore.selectedId
                            //     ).status
                            // }
                        ></Input>
                    </FormControl>
                    <FormControl variant={'floating500'}>
                        <FormLabel>current goals</FormLabel>
                        <Input
                            readOnly
                            color={'white'}
                            value="give a presentation, read a book"
                            // value={
                            //     statusAndGoalsStore.getCurrent(
                            //         selectedEmployeeStore.selectedId
                            //     ).status
                            // }
                        ></Input>
                    </FormControl>
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
                </SimpleGrid>
            </AccordionPanel>
        </>
    )
})
