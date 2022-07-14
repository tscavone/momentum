import {
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    VStack,
    Box,
    Badge,
    HStack,
    Divider,
    Center,
    Button,
    Tag,
} from '@chakra-ui/react'
import { DatedObject } from '../../util/DatedObject'
import { ITemporalStore } from '../../stores/ITemporalStore'
import { Note } from '../../value_objects/Note'
import { makeObservable, observable } from 'mobx'
import { DatePicker } from '../subcomponents/DatePicker'
import {
    useNoteStore,
    useSelectedEmployeeStore,
    useEmployeeStore,
    useStretchAnswerStore,
    useStatusAndGoalsStore,
} from '../RootStoreProvider'
import { DateRange } from '../../util/DateRange'
import { observer } from 'mobx-react'
import { IdentifiedObject } from '../../util/IdentifiedObject'
import { ReactNode } from 'react'
import { dateToString } from '../../../shared/utils'
import { NoteReport } from './NoteReport'
import { StretchAnswer } from '../../value_objects/StretchAnswer'
import { StretchReport } from './StretchReport'
import { Goal } from '../../value_objects/Goal'
import { GoalReport } from './GoalReport'
import { StatusAndGoals } from '../../value_objects/StatusAndGoals'
import { StatusReport } from './StatusReport'

//
// Date state
//
class ReportDates {
    reportStartDate: Date
    reportEndDate: Date

    constructor() {
        makeObservable(this, {
            reportStartDate: observable,
            reportEndDate: observable,
        })

        this.reportStartDate = new Date('02/01/2022')
        this.reportEndDate = new Date('03/21/2022')
    }
}
let reportDates = new ReportDates()

export const ReportDrawer = observer(({ isOpen, onOpen, onClose }) => {
    const noteStore = useNoteStore()
    const stretchAnswerStore = useStretchAnswerStore()
    const statusAndGoalsStore = useStatusAndGoalsStore()
    const selectedEmployeeStore = useSelectedEmployeeStore()
    const selectedEmployee = useEmployeeStore().getEmployee(
        selectedEmployeeStore.selectedId
    )

    function getReportComponentsInRange<T>(
        objectStore: ITemporalStore<T>
    ): Map<string, IdentifiedObject[]> {
        let reportObjects = new Map<string, IdentifiedObject[]>()

        const reportObjectsArray: DatedObject<IdentifiedObject>[] =
            objectStore.getSaved(
                selectedEmployeeStore.selectedId,
                new DateRange(
                    reportDates.reportStartDate,
                    reportDates.reportEndDate
                )
            ) as DatedObject<IdentifiedObject>[]

        reportObjectsArray.forEach((datedReportObject) => {
            let dateString = dateToString(datedReportObject.date)
            let reportObjectsArray = reportObjects.get(dateString)

            if (typeof reportObjectsArray === 'undefined') {
                reportObjectsArray = []
            }
            reportObjectsArray.push(datedReportObject.obj)
            reportObjects.set(dateString, reportObjectsArray)
        })
        return reportObjects
    }

    const renderObjectReports = (
        reportables: Map<string, IdentifiedObject[]>[]
    ): ReactNode => {
        const reportableDates: Set<string> = new Set<string>()

        //get a set of all the dates in all the maps
        reportables.forEach((reportableMap) => {
            reportableMap.forEach((reportable, dateString) => {
                reportableDates.add(dateString)
            })
        })

        const dateReportComponentMap: Map<string, ReactNode[]> = new Map<
            string,
            ReactNode[]
        >()

        //for each date, render an array of report components and add it to the map
        //for that date
        reportableDates.forEach((dateString) => {
            const reportComponentsForDate = []

            reportables.forEach((reportMap) => {
                //if this set of objects (i.e. notes, stretchAnswers) doesn't have any for this date, continue

                if (!reportMap.get(dateString)) {
                    return
                }
                reportComponentsForDate.push(
                    reportMap
                        .get(dateString)
                        .map((reportable) => renderReportComponent(reportable))
                )
            })
            dateReportComponentMap.set(dateString, reportComponentsForDate)
        })

        //finally, make an array of rendered date components with their respective report components
        const dateReportComponents: ReactNode[] = []
        dateReportComponentMap.forEach((reportComponents, dateString) => {
            dateReportComponents.push(
                <VStack alignItems={'flex-start'}>
                    <Box mx={-5}>
                        <Tag
                            size={'lg'}
                            key={'lg'}
                            variant="solid"
                            colorScheme="green"
                        >
                            {dateString}
                        </Tag>
                    </Box>
                    {reportComponents}
                </VStack>
            )
        })

        return (
            <section>
                <VStack>{dateReportComponents}</VStack>
            </section>
        )
    }

    const renderReportComponent = (
        reportObject: IdentifiedObject
    ): ReactNode => {
        if (reportObject instanceof Note) {
            return (
                <NoteReport
                    key={reportObject.id.id}
                    note={reportObject}
                ></NoteReport>
            )
        } else if (reportObject instanceof StretchAnswer) {
            return (
                <StretchReport
                    key={reportObject.id.id}
                    stretchAnswer={reportObject}
                ></StretchReport>
            )
        } else if (reportObject instanceof StatusAndGoals) {
            let reportObjects: ReactNode[] = []

            reportObjects.push(
                <StatusReport
                    key={reportObject.id.id}
                    status={reportObject.status}
                />
            )
            for (const goal of reportObject.goals) {
                reportObjects.push(<GoalReport key={goal.id.id} goal={goal} />)
            }
            return <>{reportObjects}</>
        } else {
            throw Error(
                `ReportDrawer:renderReportComponent reportObject not of any instance: ${reportObject}`
            )
        }
    }

    const renderReport = (): ReactNode => {
        const reportComponents: Map<string, IdentifiedObject[]>[] = []
        reportComponents.push(
            getReportComponentsInRange<StatusAndGoals>(statusAndGoalsStore)
        )
        reportComponents.push(getReportComponentsInRange<Note>(noteStore))
        reportComponents.push(
            getReportComponentsInRange<StretchAnswer>(stretchAnswerStore)
        )

        return renderObjectReports(reportComponents)
    }

    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={'lg'}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>
                    {selectedEmployee ? (
                        <Center>{` ${selectedEmployee.first}'s Report `}</Center>
                    ) : (
                        <></>
                    )}
                    <Divider orientation="horizontal" />
                    <HStack>
                        <Box>
                            <DatePicker
                                value={
                                    reportDates.reportStartDate
                                        .toISOString()
                                        .split('T')[0]
                                }
                                label="Start"
                                onChange={(event) =>
                                    (reportDates.reportStartDate = new Date(
                                        event.target.value
                                    ))
                                }
                            />
                        </Box>
                        <Box>
                            <DatePicker
                                value={
                                    reportDates.reportEndDate
                                        .toISOString()
                                        .split('T')[0]
                                }
                                label="End"
                                onChange={(event) =>
                                    (reportDates.reportEndDate = new Date(
                                        event.target.value
                                    ))
                                }
                            />
                        </Box>
                        <Button colorScheme={'green'}>Email Report</Button>
                    </HStack>
                </DrawerHeader>

                <DrawerBody>{renderReport()}</DrawerBody>
            </DrawerContent>
        </Drawer>
    )
})
