import {
    Slider,
    SliderFilledTrack,
    SliderMark,
    SliderThumb,
    SliderTrack,
    Text,
    VStack,
} from '@chakra-ui/react'
import { Goal } from '../../value_objects/Goal'
import { useSettingsStore } from '../RootStoreProvider'
import { ReportContainer } from './ReportContainer'

// a component to display a Note in the report drawer
export const GoalReport = ({ goal }: { goal: Goal }) => {
    const settingsStore = useSettingsStore()

    const goalName = settingsStore.getValueById(goal.settingValueId).value

    return (
        <ReportContainer reportName={'goals'} iconName={'FiCheckCircle'}>
            <VStack>
                <Text color={'gray.900'}>{goalName}</Text>
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
        </ReportContainer>
    )
}
