//
// this component represents the notes tab in the main application
//
import {
    useSelectedEmployeeStore,
    useSettingsStore,
    useStatusAndGoalsStore,
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
} from '@chakra-ui/react'
import { observer } from 'mobx-react'
import { GoalComponent } from '../GoalComponent'
import { Goal } from '../../value_objects/Goal'
import React from 'react'
import { FiPlus } from 'react-icons/fi'
import { Id } from '../../util/Id'

export const GoalsTab = observer(() => {
    const selectedEmployeeStore = useSelectedEmployeeStore()
    const settingsStore = useSettingsStore()
    const statusAndGoalStore = useStatusAndGoalsStore()

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

    const addGoal = (event) => {
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
        /*
            let settingEntryId = event.currentTarget.value

            const newNameField: HTMLInputElement | null =
                document.getElementById(
                    'newSettingName-' + settingEntryId
                ) as HTMLInputElement

            if (newNameField === null)
                throw new Error(
                    'SettingsMenuItem: did not find text ID:' +
                        'newSettingName-' +
                        settingEntryId
                )
            const newValueName = newNameField.value
            //clear field so that when this operation is over, the
            //new field is empty
            newNameField.value = ''

            //Not every new dynamic setting will have a description
            //so sometimes this will be null
            let newValueDesc = null
            const newDescField: HTMLTextAreaElement | null =
                document.getElementById(
                    'newSettingDesc-' + settingEntryId
                ) as HTMLTextAreaElement

            if (newDescField !== null) {
                newValueDesc = newDescField.value

                //clear field so that when this operation is over, the
                //new field is empty
                newDescField.value = ''
            }

            let newSettings: [SettingsEntry, SettingsValue[]][] = []
            //create array copy for react
            for (const setting of settings) {
                newSettings.push([setting[0], [...setting[1]]])
            }

            for (const [index, setting] of newSettings.entries()) {
                if (setting[0].id.id === settingEntryId) {
                    let newSettingsValue: any = null
                    if (setting[1][0] instanceof SettingsValueWithDesc) {
                        newSettingsValue = new SettingsValueWithDesc()
                        newSettingsValue.description = newValueDesc
                    } else {
                        newSettingsValue = new SettingsValue()
                    }
                    newSettingsValue.value = newValueName

                    setting[1].push(newSettingsValue)
                    newSettings[index] = [setting[0], [...setting[1]]]

                    setSettings(newSettings)
                    return
                }
            }

            console.log(
                'Adding new settings went wrong: ',
                event.currentTarget.value,
                newSettings
            )
            throw new Error(
                'Adding new settings went wrong: ' + event.currentTarget.value
            )
            */
    }
    return (
        <VStack>
            <Heading as="h4" size="md">
                status and goals
            </Heading>
            <Divider orientation="horizontal" />
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
                                        updateProgress={null}
                                    />
                                    <VStack w={100}>
                                        <VStack>
                                            <Checkbox>complete</Checkbox>
                                            <Checkbox
                                                style={{ marginLeft: '-21px' }}
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
        </VStack>
    )
})
