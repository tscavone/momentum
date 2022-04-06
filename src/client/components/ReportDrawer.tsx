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
} from '@chakra-ui/react'
import { DatedObject } from '../util/DatedObject'
import { ITemporalStore } from '../stores/ITemporalStore'
import { Note } from '../value_objects/Note'
import { makeObservable, observable } from 'mobx'
import { DatePicker } from './DatePicker'
import {
    useNoteStore,
    useSelectedEmployeeStore,
    useEmployeeStore,
} from './RootStoreProvider'
import { DateRange } from '../util/DateRange'
import { observer } from 'mobx-react'
import { IdentifiedObject } from '../util/IdentifiedObject'
import { ReactNode } from 'react'
import { dateToString } from '../util/utils'
import { NoteReport } from './reportComponents/NoteReport'

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
    const selectedEmployeeStore = useSelectedEmployeeStore()
    const selectedEmployee = useEmployeeStore().getEmployee(
        selectedEmployeeStore.selectedId
    )

    // Map<string, IReportable[]>
    //rename all this stuff
    function getReportComponentsInRange(
        objectStore: ITemporalStore
    ): Map<string, IdentifiedObject[]> {
        const reportObjectsArray: DatedObject<IdentifiedObject>[] =
            objectStore.getSaved(
                selectedEmployeeStore.selectedId,
                new DateRange(
                    reportDates.reportStartDate,
                    reportDates.reportEndDate
                )
            ) as DatedObject<IdentifiedObject>[]

        let reportObjects = new Map<string, IdentifiedObject[]>()

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

    //write a function that gets all the maps, then get all the dates from all maps,
    // create a Map<string, IdentifiedObject>
    // move the creation of the report jsx obects into the value objects themsself?
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
        reportableDates.forEach((dateString) =>
            reportables.forEach((reportMap) => {
                dateReportComponentMap.set(
                    dateString,
                    reportMap
                        .get(dateString)
                        .map((reportable) => renderReportComponent(reportable))
                )
            })
        )

        //finally, make an array of rendered date components with their respective report components
        const dateReportComponents: ReactNode[] = []
        dateReportComponentMap.forEach((reportComponents, dateString) => {
            dateReportComponents.push(
                <VStack alignItems={'flex-start'}>
                    <Box>
                        <Badge>{dateString}</Badge>
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
        } else {
            throw Error(
                `ReportDrawer:renderReportComponent reportObject not of any instance: ${reportObject}`
            )
        }
    }

    const renderReport = (): ReactNode => {
        const reportComponents = []
        reportComponents.push(getReportComponentsInRange(noteStore))

        return renderObjectReports(reportComponents)
    }

    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={'lg'}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>
                    <Center>{` ${selectedEmployee.first}'s Report `}</Center>
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
