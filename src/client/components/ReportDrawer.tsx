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
    Container,
    FormControl,
    HStack,
    Divider,
    Center,
    Button,
} from '@chakra-ui/react'
import { DatedObject } from '../util/DatedObject'
import { Note } from '../value_objects/Note'
import { Id } from '../util/Id'
import { makeObservable, observable } from 'mobx'
import { DatePicker } from './DatePicker'
import { useNoteStore, useSelectedEmployeeStore } from './RootStoreProvider'
import { DateRange } from '../util/DateRange'
import { observer } from 'mobx-react'

const NoteReport = ({ note }: { note: DatedObject<Note> }) => {
    return (
        <VStack alignItems={'flex-start'}>
            <Box>
                <Badge>{note.date.toISOString().split('T')[0]}</Badge>
            </Box>
            <Container
                p={5}
                shadow="md"
                borderWidth="1px"
                w={[250, 500]}
                borderRadius="md"
                dangerouslySetInnerHTML={{ __html: note.obj.text }}
            ></Container>
        </VStack>
    )
}

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

    const getDisplayNotes = () => {
        let id = new Id()
        id.id = selectedEmployeeStore.selectedId

        let displayNotes: DatedObject<Note>[] = noteStore.getSaved(
            id,
            new DateRange(
                reportDates.reportStartDate,
                reportDates.reportEndDate
            )
        ) as DatedObject<Note>[]
        return displayNotes
    }

    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={'lg'}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>
                    <Center>Leigh's Report</Center>
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
                        <Button>Email Report</Button>
                    </HStack>
                </DrawerHeader>

                <DrawerBody>
                    <VStack>
                        {getDisplayNotes().map((note, i) => {
                            return <NoteReport key={i} note={note} />
                        })}
                    </VStack>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
})
