//
// this component represents the notes tab in the main application
//
import {
    useSelectedEmployeeStore,
    useSettingsStore,
    useStatusAndGoalsStore,
    useCurrentDateStore,
} from '../RootStoreProvider'
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormHelperText,
    FormLabel,
    Heading,
    HStack,
    Spacer,
    Textarea,
    VStack,
    Text,
    Flex,
    useToast,
} from '@chakra-ui/react'
import { observer } from 'mobx-react'
import { GoalComponent } from '../GoalComponent'
import { Goal } from '../../value_objects/Goal'
import React from 'react'
import { FiPlus } from 'react-icons/fi'
import { Id } from '../../util/Id'
import { StatusAndGoals } from '../../value_objects/StatusAndGoals'
import { TabPanelContainer } from './TabPanelContainer'

export const GoalsTab = observer(() => {
    const selectedEmployeeStore = useSelectedEmployeeStore()
    const settingsStore = useSettingsStore()
    const statusAndGoalStore = useStatusAndGoalsStore()
    const currentDateStore = useCurrentDateStore()
    const toast = useToast()

    const [goals, setGoals] = React.useState<Goal[]>(
        statusAndGoalStore.getCurrent(selectedEmployeeStore.selectedId).goals
    )
    const [status, setStatus] = React.useState<string>('')
    const [name, setName] = React.useState<string>('')
    const [details, setDetails] = React.useState<string>('')

    const [progress, setProgress] = React.useState<number>(0)

    const updateStatus = (event) => {
        setStatus(event.target.value)
    }

    const updateGoals = () => {
        let current = StatusAndGoals.instantiate(
            statusAndGoalStore.getCollectionForEmployee(
                selectedEmployeeStore.selectedId
            )
        )

        current.status = status
        current.goals = goals
        statusAndGoalStore.setCurrent(selectedEmployeeStore.selectedId, current)
        statusAndGoalStore
            .save(
                selectedEmployeeStore.selectedId,
                currentDateStore.date ? currentDateStore.date : new Date(),
                StatusAndGoals.instantiate(
                    statusAndGoalStore.getCollectionForEmployee(
                        selectedEmployeeStore.selectedId
                    )
                )
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

    const updateExistingGoalProgress = (event) => {
        console.log(event)
    }
    const addGoal = () => {
        const newGoals = [...goals]
        let newGoal = new Goal()

        newGoal.details = details
        newGoal.progress = progress

        const selectElement: HTMLSelectElement = document.getElementById(
            'newGoal'
        ) as HTMLSelectElement

        if (!selectElement) throw new Error('did not find newGoal select')

        newGoal.settingValueId = Id.fromString(selectElement.value)

        newGoals.push(newGoal)
        setGoals(newGoals)

        //reset 'new' fields
        setDetails('')
        setProgress(0)
        setName(null)
    }

    return (
        <TabPanelContainer title="status and goals" helpText="" tag="goals">
            <Box w={[250, 500, 750]}>
                <FormControl>
                    <FormLabel fontSize="2xl" htmlFor="status">
                        current status
                    </FormLabel>
                    <Textarea
                        id="status"
                        colorScheme={'green'}
                        value={status}
                        onChange={updateStatus}
                        isReadOnly={false}
                    ></Textarea>
                    <FormHelperText>
                        The current project or task your report is working on
                    </FormHelperText>
                </FormControl>
                <Divider mt={3} mb={3} orientation="horizontal" />
            </Box>
            <Spacer />
            <Box w={[250, 500, 750]}>
                <Text fontSize="2xl" style={{ marginBottom: '8px' }}>
                    goals
                </Text>
                <VStack style={{ marginLeft: '80px' }}>
                    {goals.map((goal) => {
                        return (
                            <div key={goal.id.id}>
                                <HStack>
                                    <GoalComponent
                                        goalName={
                                            settingsStore.getValueById(
                                                goal.settingValueId
                                            ).value
                                        }
                                        goal={goal}
                                        progress={goal.progress}
                                        details={goal.details}
                                        updateName={null}
                                        updateDetails={null}
                                        updateLink={null}
                                        updateProgress={
                                            updateExistingGoalProgress
                                        }
                                    />
                                    <VStack w={100}>
                                        <VStack>
                                            <Checkbox>complete</Checkbox>
                                            <Checkbox
                                                style={{
                                                    marginLeft: '-21px',
                                                }}
                                            >
                                                cancel
                                            </Checkbox>
                                        </VStack>
                                    </VStack>
                                </HStack>
                                <Spacer />
                            </div>
                        )
                    })}

                    <Spacer />
                    <Spacer />
                    <HStack>
                        <GoalComponent
                            goalName={null}
                            goal={null}
                            details={details}
                            progress={progress}
                            updateName={(e) => setName(e.currentTarget.value)}
                            updateDetails={(e) =>
                                setDetails(e.currentTarget.value)
                            }
                            updateLink={null}
                            updateProgress={setProgress}
                        />
                        <VStack w={100}>
                            <VStack>
                                <Button
                                    size={'sm'}
                                    style={{
                                        marginTop: '-70px',
                                        marginLeft: '-55px',
                                    }}
                                    onClick={addGoal}
                                >
                                    <FiPlus />
                                </Button>
                                <Checkbox style={{ marginTop: '30px' }}>
                                    complete
                                </Checkbox>
                                <Checkbox style={{ marginLeft: '-21px' }}>
                                    cancel
                                </Checkbox>
                            </VStack>
                        </VStack>
                    </HStack>
                </VStack>
            </Box>
            <Flex
                alignItems={'center'}
                justifyContent={'flex-end'}
                direction={'row'}
                w={[250, 500, 750]}
            >
                <Box p={2}>
                    <Button onClick={updateGoals} colorScheme="green">
                        save
                    </Button>
                </Box>
            </Flex>
        </TabPanelContainer>
    )
})
