import {
    Box,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Slider,
    SliderFilledTrack,
    SliderMark,
    SliderThumb,
    SliderTrack,
    Textarea,
} from '@chakra-ui/react'
import { observer } from 'mobx-react'
import { useState } from 'react'

export const Goal = observer(() => {
    //const goalsStore = useGoalsStore()
    //const selectedEmployeeStore = useSelectedEmployeeStore()
    //const currentDateStore = useCurrentDateStore()

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

    const [sliderValue, setSliderValue] = useState(50)

    return (
        <Flex w={[250, 500, 750]}>
            <FormControl>
                <details>
                    <summary className="goal-name">
                        <Input width="97%" placeholder="goal name" />
                    </summary>
                    <Slider
                        pl={'15px'}
                        w={'97%'}
                        aria-label="slider-ex-6"
                        onChange={(val) => setSliderValue(val)}
                        colorScheme={'green'}
                    >
                        <SliderMark value={10} mt="1" ml="-2.5" fontSize="sm">
                            10%
                        </SliderMark>
                        <SliderMark value={20} mt="1" ml="-2.5" fontSize="sm">
                            20%
                        </SliderMark>
                        <SliderMark value={30} mt="1" ml="-2.5" fontSize="sm">
                            30%
                        </SliderMark>
                        <SliderMark value={40} mt="1" ml="-2.5" fontSize="sm">
                            40%
                        </SliderMark>
                        <SliderMark value={50} mt="1" ml="-2.5" fontSize="sm">
                            50%
                        </SliderMark>
                        <SliderMark value={60} mt="1" ml="-2.5" fontSize="sm">
                            60%
                        </SliderMark>
                        <SliderMark value={70} mt="1" ml="-2.5" fontSize="sm">
                            70%
                        </SliderMark>
                        <SliderMark value={80} mt="1" ml="-2.5" fontSize="sm">
                            80%
                        </SliderMark>
                        <SliderMark value={90} mt="1" ml="-2.5" fontSize="sm">
                            90%
                        </SliderMark>
                        <SliderMark
                            value={sliderValue}
                            textAlign="center"
                            bg="green.500"
                            color="white"
                            mt="-10"
                        ></SliderMark>
                        <SliderTrack>
                            <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                    </Slider>
                    <Box pl={'15px'} w={'99%'} mt={'20px'}>
                        <Textarea
                            id="goal-description"
                            colorScheme={'green'}
                            value={getValue()}
                            onChange={updateCurrent}
                            isReadOnly={false}
                        ></Textarea>
                    </Box>
                </details>
            </FormControl>
        </Flex>
    )
})
