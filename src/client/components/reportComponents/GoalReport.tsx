import {
    Box,
    Container,
    HStack,
    Slider,
    SliderFilledTrack,
    SliderMark,
    SliderThumb,
    SliderTrack,
    Tag,
    TagLabel,
    TagRightIcon,
    VStack,
} from '@chakra-ui/react'
import { FiCheckCircle } from 'react-icons/fi'
import { Goal } from '../../value_objects/Goal'
import { useSettingsStore } from '../RootStoreProvider'

// a component to display a Note in the report drawer
export const GoalReport = ({ goal }: { goal: Goal }) => {
    const settingsStore = useSettingsStore()

    const goalName = settingsStore.getValueById(goal.settingValueId).value

    return (
        <Container
            p={5}
            shadow="md"
            borderWidth="1px"
            w={[250, 500]}
            borderRadius="md"
        >
            <Box width="95%">
                <details>
                    <summary>
                        <HStack display={'inline-flex'}>
                            <Tag
                                size={'md'}
                                key={'md'}
                                variant="outline"
                                colorScheme="green"
                            >
                                <TagLabel>{goalName}</TagLabel>
                                <TagRightIcon as={FiCheckCircle} />
                            </Tag>
                        </HStack>
                    </summary>
                    <VStack>
                        <Slider
                            aria-checked
                            id={goal.id.id}
                            pl={'15px'}
                            w={'87%'}
                            aria-label="slider-ex-6"
                            colorScheme={'green'}
                            value={goal.progress}
                        >
                            <SliderMark
                                value={goal.progress}
                                mt="1"
                                ml="-2.5"
                                fontSize="sm"
                            >
                                {goal.progress}%
                            </SliderMark>
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb />
                        </Slider>
                    </VStack>
                </details>
            </Box>
        </Container>
    )
}
