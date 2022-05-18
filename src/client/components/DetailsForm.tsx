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
import { dateToString } from '../util/utils'
import { Employee } from '../value_objects/Employee'
import {
    useEmployeeStore,
    useSelectedEmployeeStore,
    useSettingsStore,
} from './RootStoreProvider'

const DetailsInput = ({
    label,
    value,
    handleChange,
    helperText = '',
}: {
    label: string
    value: string
    handleChange: (event) => void
    helperText?: string
}) => {
    return (
        <FormControl style={{ margin: '16px' }} variant="floating">
            <FormLabel>{label}</FormLabel>
            <Input value={value} onChange={handleChange}></Input>
            {helperText != '' ? (
                <FormHelperText>only month and date necessary</FormHelperText>
            ) : (
                ''
            )}
        </FormControl>
    )
}
export const DetailsForm = ({
    employee,
    setEmployee,
}: {
    employee: Employee
    setEmployee: (employee) => Promise<string>
}) => {
    const employeeStore = useEmployeeStore()
    const selectedEmployeeStore = useSelectedEmployeeStore()
    const settingsStore = useSettingsStore()

    const [first, setFirst] = useState<string>(employee.first)

    const [last, setLast] = useState<string>(employee.last)

    const controlStyle = { margin: '16px' }

    employeeStore.getEmployee(selectedEmployeeStore.selectedId)

    const pickerStyle = {
        border: '1px solid lightgrey',
        padding: '5px',
        borderRadius: '5px',
    }

    const updateEmployee = () => {
        employee.first = first
        employee.last = last
        setEmployee(employee)
    }

    return (
        <>
            <Box w={[250, 500, 750]}>
                <DetailsInput
                    label="first name"
                    value={first}
                    handleChange={(event) => setFirst(event.target.value)}
                />

                <DetailsInput
                    label="last name"
                    value={last}
                    handleChange={(event) => setLast(event.target.value)}
                />
                <FormControl style={controlStyle} variant="floating">
                    <FormLabel>email</FormLabel>
                    <Input
                        type={'email'}
                        value={employee.email}
                        onChange={(event) => {
                            employee.email = event.target.value
                            setEmployee(employee)
                        }}
                    ></Input>
                </FormControl>

                <FormControl style={controlStyle} variant="floating">
                    <FormLabel>{'start date'}</FormLabel>
                    <input
                        style={pickerStyle}
                        type="date"
                        value={
                            employee.startDate
                                ? dateToString(employee.startDate)
                                : dateToString(new Date())
                        }
                        onChange={(event) => {
                            employee.startDate = new Date(event.target.value)
                            setEmployee(employee)
                        }}
                    />
                </FormControl>

                <FormControl style={controlStyle} variant="floating">
                    <FormLabel>{'position'}</FormLabel>
                    <Select
                        defaultValue={employee.position.id}
                        onChange={(event) => {
                            employee.position = Id.fromString(
                                event.target.value
                            )
                            setEmployee(employee)
                        }}
                    >
                        {settingsStore
                            .getByEntryName('positions')[1]
                            .map((settingsValue) => (
                                <option
                                    key={settingsValue.id.id}
                                    value={settingsValue.id.id}
                                >
                                    {settingsValue.value}
                                </option>
                            ))}
                    </Select>
                </FormControl>
                <DetailsInput
                    label="skills"
                    value={employee.skills.join(',')}
                    handleChange={(event) => {
                        employee.skills = (event.target.value as string).split(
                            ','
                        )
                        setEmployee(employee)
                    }}
                    helperText="comma separated list"
                />
                <DetailsInput
                    label="interests"
                    value={employee.interests.join(',')}
                    handleChange={(event) => {
                        employee.interests = (
                            event.target.value as string
                        ).split(',')
                        setEmployee(employee)
                    }}
                    helperText="comma separated list"
                />
                <DetailsInput
                    label="college"
                    value={employee.college}
                    handleChange={(event) => {
                        employee.college = event.target.value
                        setEmployee(employee)
                    }}
                />
                <DetailsInput
                    label="home town"
                    value={employee.hometown}
                    handleChange={(event) => {
                        employee.hometown = event.target.value
                        setEmployee(employee)
                    }}
                />
                <DetailsInput
                    label="current town"
                    value={employee.townOfResidence}
                    handleChange={(event) => {
                        employee.townOfResidence = event.target.value
                        setEmployee(employee)
                    }}
                />
                <FormControl style={controlStyle} variant="floating">
                    <FormLabel>{'birth day (month and day)'}</FormLabel>
                    <input
                        style={pickerStyle}
                        type="date"
                        value={
                            employee.birthMonthDay
                                ? dateToString(employee.birthMonthDay)
                                : dateToString(new Date())
                        }
                        min={`01-01-${new Date().getFullYear()}`}
                        onChange={(event) => {
                            employee.birthMonthDay = new Date(
                                event.target.value
                            )
                            setEmployee(employee)
                        }}
                    />
                    <FormHelperText>
                        only month and date necessary
                    </FormHelperText>
                </FormControl>
                <DetailsInput
                    label="pets"
                    value={employee.pets.join(',')}
                    handleChange={(event) => {
                        employee.pets = (event.target.value as string).split(
                            ','
                        )
                        setEmployee(employee)
                    }}
                />
                <FormControl style={controlStyle} variant="floating">
                    <FormLabel>{'additional details'}</FormLabel>
                    <Input
                        type="text"
                        value={employee.additionalDetails}
                        onChange={(event) => {
                            employee.additionalDetails = event.target.value
                            setEmployee(employee)
                        }}
                    />
                </FormControl>
            </Box>
            <Flex
                alignItems={'center'}
                justifyContent={'flex-end'}
                direction={'row'}
                w={[250, 500, 750]}
            >
                <Box p={2}>
                    <Button onClick={updateEmployee} colorScheme="green">
                        save details
                    </Button>
                </Box>
            </Flex>
        </>
    )
}
