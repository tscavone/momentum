import {
    Box,
    Button,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    Select,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Id } from '../util/Id'
import { dateToString } from '../../shared/utils'
import { Employee } from '../value_objects/Employee'
import { useSettingsStore } from './RootStoreProvider'
import { observer } from 'mobx-react'

const controlStyle = { margin: '16px' }

const DetailsInput = ({
    label,
    value,
    handleChange,
    isRequired,
    helperText = '',
}: {
    label: string
    value: string
    handleChange: (event) => void
    isRequired: boolean
    helperText?: string
}) => {
    return (
        <FormControl
            style={controlStyle}
            variant="floating"
            isRequired={isRequired}
        >
            <FormLabel>{label}</FormLabel>
            <Input
                id={label.replaceAll(' ', '-')}
                value={value}
                onChange={handleChange}
            ></Input>
            {helperText != '' ? (
                <FormHelperText>{helperText}</FormHelperText>
            ) : (
                ''
            )}
        </FormControl>
    )
}
export const DetailsForm = observer(
    ({
        employee,
        updateEmployee,
        isDialog,
    }: {
        employee: Employee
        updateEmployee: (employee) => void
        isDialog: boolean
    }) => {
        const settingsStore = useSettingsStore()

        const [first, setFirst] = useState<string>(employee.first)

        const [last, setLast] = useState<string>(employee.last)

        const [email, setEmail] = useState<string>(employee.email)

        const [startDate, setStartDate] = useState<Date>(employee.startDate)

        const [position, setPosition] = useState<Id>(employee.position)

        const [skills, setSkills] = useState<string[]>(employee.skills)

        const [interests, setInterests] = useState<string[]>(employee.interests)

        const [college, setCollege] = useState<string>(employee.college)

        const [hometown, setHometown] = useState<string>(employee.hometown)

        const [townOfResidence, setTownOfResidence] = useState<string>(
            employee.townOfResidence
        )

        const [birthMonthDay, setBirthMonthDay] = useState<Date>(
            employee.birthMonthDay
        )

        const [pets, setPets] = useState<string[]>(employee.pets)

        const [additionalDetails, setAdditionalDetails] = useState<string>(
            employee.additionalDetails
        )

        const pickerStyle = {
            border: '1px solid lightgrey',
            padding: '5px',
            borderRadius: '5px',
        }

        const setNewValues = () => {
            employee.first = first
            employee.last = last
            employee.email = email
            employee.startDate = startDate
            employee.position = position
            employee.skills = skills
            employee.interests = interests
            employee.college = college
            employee.hometown = hometown
            employee.townOfResidence = townOfResidence
            employee.birthMonthDay = birthMonthDay
            employee.pets = pets
            employee.additionalDetails = additionalDetails

            updateEmployee(employee)
        }

        return (
            <>
                <Box w={isDialog ? [250, 500] : [250, 500, 750]}>
                    <DetailsInput
                        label="first name"
                        value={first}
                        handleChange={(event) => setFirst(event.target.value)}
                        isRequired={true}
                    />

                    <DetailsInput
                        label="last name"
                        value={last}
                        handleChange={(event) => setLast(event.target.value)}
                        isRequired={false}
                    />
                    <FormControl style={controlStyle} variant="floating">
                        <FormLabel>email</FormLabel>
                        <Input
                            id="email"
                            type={'email'}
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        ></Input>
                    </FormControl>

                    <FormControl style={controlStyle} variant="floating">
                        <FormLabel>{'start date'}</FormLabel>
                        <input
                            id="start-date"
                            style={pickerStyle}
                            type="date"
                            value={
                                startDate
                                    ? dateToString(startDate)
                                    : dateToString(new Date())
                            }
                            onChange={(event) =>
                                setStartDate(new Date(event.target.value))
                            }
                        />
                    </FormControl>

                    <FormControl
                        style={controlStyle}
                        variant="floating"
                        isRequired
                    >
                        <FormLabel>{'position'}</FormLabel>
                        <Select
                            id="position"
                            placeholder="select a position"
                            value={position ? position.id : undefined}
                            onChange={(event) =>
                                setPosition(
                                    event.target.value
                                        ? Id.fromString(event.target.value)
                                        : null
                                )
                            }
                        >
                            {settingsStore.isLoaded ? (
                                settingsStore
                                    .getByEntryName('positions')[1]
                                    .map((settingsValue) => (
                                        <option
                                            key={settingsValue.id.id}
                                            value={settingsValue.id.id}
                                        >
                                            {settingsValue.value}
                                        </option>
                                    ))
                            ) : (
                                <option>loading</option>
                            )}
                        </Select>
                    </FormControl>
                    {/* <DetailsInput
                        label="skills"
                        value={skills.join(',')}
                        handleChange={(event) =>
                            setSkills((event.target.value as string).split(','))
                        }
                        helperText="comma separated list"
                        isRequired={false}
                    /> */}
                    <DetailsInput
                        label="interests"
                        value={interests.join(',')}
                        handleChange={(event) =>
                            setInterests(
                                (event.target.value as string).split(',')
                            )
                        }
                        helperText="comma separated list"
                        isRequired={false}
                    />
                    <DetailsInput
                        label="college"
                        value={college}
                        handleChange={(event) => setCollege(event.target.value)}
                        isRequired={false}
                    />
                    <DetailsInput
                        label="home town"
                        value={hometown}
                        handleChange={(event) =>
                            setHometown(event.target.value)
                        }
                        isRequired={false}
                    />
                    <DetailsInput
                        label="current town"
                        value={townOfResidence}
                        handleChange={(event) =>
                            setTownOfResidence(event.target.value)
                        }
                        isRequired={false}
                    />
                    <FormControl style={controlStyle} variant="floating">
                        <FormLabel>{'birth month/day'}</FormLabel>
                        <input
                            id="birthday"
                            style={pickerStyle}
                            type="date"
                            value={
                                birthMonthDay
                                    ? dateToString(birthMonthDay)
                                    : dateToString(new Date())
                            }
                            min={`01-01-${new Date().getFullYear()}`}
                            onChange={(event) =>
                                setBirthMonthDay(new Date(event.target.value))
                            }
                        />
                        <FormHelperText>
                            only month and date necessary, year ignored
                        </FormHelperText>
                    </FormControl>

                    <DetailsInput
                        label="pets"
                        value={pets.join(',')}
                        handleChange={(event) =>
                            setPets((event.target.value as string).split(','))
                        }
                        isRequired={false}
                    />

                    <FormControl style={controlStyle} variant="floating">
                        <FormLabel>{'additional details'}</FormLabel>
                        <Input
                            id="additional-details"
                            type="text"
                            value={additionalDetails}
                            onChange={(event) =>
                                setAdditionalDetails(event.target.value)
                            }
                        />
                    </FormControl>
                </Box>
                <Flex
                    alignItems={'center'}
                    justifyContent={'flex-end'}
                    direction={'row'}
                    w={isDialog ? [250, 500] : [250, 500, 750]}
                >
                    <Box p={2}>
                        <Button onClick={setNewValues} colorScheme="green">
                            save details
                        </Button>
                    </Box>
                </Flex>
            </>
        )
    }
)
