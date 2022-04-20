//
// this component represents the notes tab in the main application
//
import {
    useCurrentDateStore,
    useSelectedEmployeeStore,
} from '../RootStoreProvider'
import {
    Box,
    Button,
    Divider,
    FormControl,
    FormHelperText,
    FormLabel,
    Heading,
    HStack,
    Spacer,
    Textarea,
    VStack,
} from '@chakra-ui/react'
import { observer } from 'mobx-react'
import { Goal } from '../Goal'

export const GoalsTab = observer(() => {
    //const goalsStore = useGoalsStore()
    const selectedEmployeeStore = useSelectedEmployeeStore()
    const currentDateStore = useCurrentDateStore()

    const updateCurrent = (newValue) => {
        // let newNote = new Note()
        // newNote.text = newValue.map((n) => serialize(n)).join('')
        // var parser = new DOMParser()
        // var el = parser.parseFromString(newNote.text, 'text/html')
        // let deserialized = deserialize(el.body)
        // noteStore.setCurrent(selectedEmployeeStore.selectedId, newNote)
    }

    const updateGoals = () => {
        // noteStore.save(
        //     selectedEmployeeStore.selectedId,
        //     currentDateStore.date ? currentDateStore.date : new Date()
        // )
    }

    const getValue = () => {
        // return newValue
        //     ? newValue
        //     : stretchAnswerStore.getCurrent(
        //           selectedEmployeeStore.selectedId
        //       ).answer
        return 'foo'
    }

    return (
        <VStack>
            <Heading as="h4" size="md">
                status and goals
            </Heading>
            <Divider orientation="horizontal" />
            <Box w={[250, 500, 750]}>
                <FormControl>
                    <FormLabel htmlFor="status">current status</FormLabel>
                    <Textarea
                        id="status"
                        colorScheme={'green'}
                        value={getValue()}
                        onChange={updateCurrent}
                        isReadOnly={false}
                    ></Textarea>
                    <FormHelperText>
                        The current project or task your report is working on
                    </FormHelperText>
                </FormControl>
                <Divider mt={3} mb={3} orientation="horizontal" />
            </Box>
            <Spacer />
            <HStack>
                <Goal />
                <VStack w={50}>
                    <Button>-</Button>
                </VStack>
            </HStack>
        </VStack>
    )
})
