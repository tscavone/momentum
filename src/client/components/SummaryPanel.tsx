import {
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
    Box,
    Container,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Input,
    SimpleGrid,
    Text,
    Textarea,
} from '@chakra-ui/react'
import { observer } from 'mobx-react'
import { DatePicker } from './subcomponents/DatePicker'
import {
    useCurrentDateStore,
    useEmployeeStore,
    useNoteStore,
    useSelectedEmployeeStore,
    useSettingsStore,
    useStatusAndGoalsStore,
} from './RootStoreProvider'

export const SummaryPanel = observer(() => {
    const selectedEmployeeStore = useSelectedEmployeeStore()
    const settingsStore = useSettingsStore()
    const employeeStore = useEmployeeStore()
    const currentDateStore = useCurrentDateStore()
    const notesStore = useNoteStore()
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
                <Grid templateColumns="repeat(2, 1fr)" rowGap={4} columnGap={6}>
                    <GridItem>
                        <FormControl variant={'floating500'}>
                            <FormLabel>latest saved status</FormLabel>
                            <Input
                                readOnly
                                color={'white'}
                                value={statusAndGoalsStore.getSummarizedStatus(
                                    selectedEmployeeStore.selectedId
                                )}
                            ></Input>
                        </FormControl>
                    </GridItem>
                    <GridItem rowSpan={2} h={'full'}>
                        <FormControl variant={'floating500'}>
                            <FormLabel>latest saved notes</FormLabel>
                            <Box
                                borderRadius={'5px'}
                                p={'5'}
                                border="1px solid #a8bda7"
                                color={'white'}
                                dangerouslySetInnerHTML={{
                                    __html: notesStore.getNoteSummary(
                                        selectedEmployeeStore.selectedId
                                    ),
                                }}
                            ></Box>
                        </FormControl>
                    </GridItem>
                    <GridItem>
                        <FormControl variant={'floating500'}>
                            <FormLabel>current concerns</FormLabel>
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
                    </GridItem>
                    <GridItem>
                        <FormControl variant={'floating500'}>
                            <FormLabel>current goals</FormLabel>
                            <Input
                                readOnly
                                color={'white'}
                                value={statusAndGoalsStore.getSummarizedGoals(
                                    selectedEmployeeStore.selectedId,
                                    settingsStore
                                )}
                            ></Input>
                        </FormControl>
                    </GridItem>
                    <GridItem>
                        <Box
                            borderRadius={'5px'}
                            p={1}
                            border="1px solid #a8bda7"
                        >
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
                        </Box>
                    </GridItem>
                </Grid>
            </AccordionPanel>
        </>
    )
})
