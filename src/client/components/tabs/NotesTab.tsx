//
// this component represents the notes tab in the main application
//
import {
    useCurrentDateStore,
    useNoteStore,
    useSelectedEmployeeStore,
} from '../RootStoreProvider'
import { RichTextBlock, serialize, deserialize } from '../RichTextBlock'
import {
    Box,
    Button,
    chakra,
    Checkbox,
    Divider,
    Flex,
    Heading,
    HStack,
    Popover,
    PopoverAnchor,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Spacer,
    Text,
    useBoolean,
    useToast,
    VStack,
} from '@chakra-ui/react'
import { Note } from '../../value_objects/Note'
import { observer } from 'mobx-react'
import { FiInfo } from 'react-icons/fi'
import { useEffect } from 'react'

export const NotesTab = observer(() => {
    const noteStore = useNoteStore()
    const selectedEmployeeStore = useSelectedEmployeeStore()
    const currentDateStore = useCurrentDateStore()
    const toast = useToast()
    const [Help, setHelp] = useBoolean(true)

    const updateCurrentNote = (newValue) => {
        let newNote = new Note()

        newNote.text = newValue.map((n) => serialize(n)).join('')

        var parser = new DOMParser()
        var el = parser.parseFromString(newNote.text, 'text/html')

        noteStore.setCurrent(selectedEmployeeStore.selectedId, newNote)
    }

    const updateNotes = () => {
        noteStore
            .save(
                selectedEmployeeStore.selectedId,
                currentDateStore.date ? currentDateStore.date : new Date(),
                new Note()
            )
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

    const getDeserialized = () => {
        let currentNote = noteStore.getCurrent(
            selectedEmployeeStore.selectedId
        ) as Note

        if (currentNote.isNewlyMinted()) return

        var parser = new DOMParser()
        var el = parser.parseFromString(currentNote.text, 'text/html')
        let deserialized = deserialize(el.body)

        return deserialized
    }

    return (
        <Popover
            isOpen={Help}
            onOpen={setHelp.on}
            onClose={setHelp.off}
            closeOnBlur={false}
            placement="left"
            autoFocus={false}
            isLazy={true}
        >
            <VStack>
                <HStack>
                    <Heading as="h4" size="md">
                        notes
                    </Heading>
                    <PopoverTrigger>
                        <FiInfo />
                    </PopoverTrigger>
                </HStack>
                <Divider orientation="horizontal" />
                <PopoverAnchor>
                    <Box minH="md " p={'4'}>
                        <Box w={[250, 500, 750]}>
                            <RichTextBlock
                                initialValue={getDeserialized()}
                                readOnly={false}
                                updateCurrent={updateCurrentNote}
                            />
                        </Box>
                        <Flex
                            alignItems={'center'}
                            justifyContent={'flex-end'}
                            direction={'row'}
                            w={[250, 500, 750]}
                        >
                            <Spacer />
                            <Box p={2}>
                                <Checkbox>private</Checkbox>
                            </Box>
                            <Box p={2}>
                                <Button
                                    onClick={updateNotes}
                                    colorScheme="green"
                                >
                                    save note
                                </Button>
                            </Box>
                        </Flex>
                    </Box>
                </PopoverAnchor>
            </VStack>

            <PopoverContent border={'0px'} w="48" mt={24}>
                <PopoverBody>
                    <Box
                        px={4}
                        py={3}
                        bg={'green.600'}
                        shadow="md"
                        rounded="md"
                    >
                        <Flex
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <chakra.span fontSize="sm" color={'gray.200'}>
                                <FiInfo>Help</FiInfo>
                            </chakra.span>
                            <chakra.span
                                bg={'green.800'}
                                color={'gray.200'}
                                px={3}
                                py={1}
                                rounded="full"
                                textTransform="uppercase"
                                fontSize="xs"
                            >
                                notes
                            </chakra.span>
                        </Flex>

                        <Box>
                            <chakra.h1
                                fontSize="lg"
                                fontWeight="bold"
                                mt={2}
                                color={'white'}
                            >
                                How to use{' '}
                                <chakra.span fontStyle={'italic'}>
                                    notes
                                </chakra.span>
                            </chakra.h1>
                            <chakra.p fontSize="sm" mt={2} color={'gray.200'}>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Odio eligendi similique
                                exercitationem optio libero vitae accusamus
                                cupiditate laborum eos.
                            </chakra.p>
                        </Box>
                    </Box>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
})
