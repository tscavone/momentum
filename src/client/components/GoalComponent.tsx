import {
    Box,
    Flex,
    FormControl,
    Text,
    HStack,
    Input,
    Slider,
    SliderFilledTrack,
    SliderMark,
    SliderThumb,
    SliderTrack,
    Textarea,
    Select,
} from '@chakra-ui/react'
import { ChangeEventHandler, Dispatch, SetStateAction } from 'react'
import { Goal } from '../value_objects/Goal'
import { useSettingsStore } from './RootStoreProvider'

export const GoalComponent = ({
    goalName,
    goal,
    progress,
    details,
    updateName,
    updateDetails,
    updateLink,
    updateProgress,
}: {
    goalName: string | null
    goal: Goal | null
    progress: number
    details: string
    updateName: ChangeEventHandler<HTMLInputElement> | null
    updateDetails: ChangeEventHandler<HTMLTextAreaElement> | null
    updateLink: Dispatch<SetStateAction<string>> | null
    updateProgress: (event) => void
}) => {
    const settingsStore = useSettingsStore()

    const populateSelect = () => {
        const goalsSetting = settingsStore.getByEntryName('goals')

        return (
            <Box style={{ width: '97%', marginLeft: '15px' }}>
                <Select placeholder="select new goal" id="newGoal" value={null}>
                    {goalsSetting[1].map((goalSettingsValue) => {
                        return (
                            <option value={goalSettingsValue.id.id}>
                                {goalSettingsValue.value}
                            </option>
                        )
                    })}
                </Select>
            </Box>
        )
    }

    const goalBody = () => {
        return (
            <>
                {' '}
                <Box pl={'15px'} w={'99%'} mt={'20px'}>
                    <Textarea
                        id="new goal description"
                        colorScheme={'green'}
                        value={details ? details : ''}
                        onChange={updateDetails}
                        isReadOnly={goal ? true : false}
                    ></Textarea>
                </Box>
                <HStack style={{ marginTop: '10px', marginLeft: '15px' }}>
                    <Text>progress:</Text>
                    <Slider
                        aria-checked
                        id={goal ? goal.id.id : 'newGoalSlider'}
                        pl={'15px'}
                        w={'87%'}
                        aria-label="slider-ex-6"
                        onChange={updateProgress}
                        colorScheme={'green'}
                        value={progress}
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
                            value={goal ? goal.progress : 0}
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
                </HStack>
            </>
        )
    }
    return (
        <Flex w={[250, 500, 750]} paddingBottom={'6'}>
            <FormControl>
                {goal ? (
                    <details>
                        <summary className="goal-name">
                            <Input
                                width="97%"
                                value={goalName}
                                readOnly={true}
                                onChange={updateName}
                            />
                        </summary>
                        {goalBody()}
                    </details>
                ) : (
                    <>
                        {populateSelect()}
                        {goalBody()}
                    </>
                )}
            </FormControl>
        </Flex>
    )
}
