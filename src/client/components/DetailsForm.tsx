import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import { dateToString } from '../util/utils'
import {
    useEmployeeStore,
    useSelectedEmployeeStore,
    useSettingsStore,
} from './RootStoreProvider'

export const DetailsForm = () => {
    const controlStyle = { margin: '16px' }
    const DetailsInput = ({
        label,
        value,
    }: {
        label: string
        value: string
    }) => {
        return (
            <FormControl style={controlStyle} variant="floating">
                <FormLabel>{label}</FormLabel>
                <Input value={value}></Input>
            </FormControl>
        )
    }
    const employeeStore = useEmployeeStore()
    const selectedEmployeeStore = useSelectedEmployeeStore()
    const settingsStore = useSettingsStore()

    employeeStore.getEmployee(selectedEmployeeStore.selectedId)

    const pickerStyle = {
        border: '1px solid lightgrey',
        padding: '5px',
        borderRadius: '5px',
    }
    return (
        <>
            <DetailsInput
                label="first name"
                value={
                    employeeStore.getEmployee(selectedEmployeeStore.selectedId)
                        .first
                }
            />
            <DetailsInput
                label="last name"
                value={
                    employeeStore.getEmployee(selectedEmployeeStore.selectedId)
                        .last
                }
            />
            <FormControl style={controlStyle} variant="floating">
                <FormLabel>email</FormLabel>
                <Input
                    type={'email'}
                    value={
                        employeeStore.getEmployee(
                            selectedEmployeeStore.selectedId
                        ).email
                    }
                ></Input>
            </FormControl>

            <FormControl style={controlStyle} variant="floating">
                <FormLabel>{'start date'}</FormLabel>
                <input
                    style={pickerStyle}
                    type="date"
                    value={dateToString(
                        employeeStore.getEmployee(
                            selectedEmployeeStore.selectedId
                        ).startDate
                    )}
                />
            </FormControl>
            <DetailsInput
                label="position"
                value={
                    settingsStore.getValueById(
                        employeeStore.getEmployee(
                            selectedEmployeeStore.selectedId
                        ).position
                    ).value
                }
            />
            <DetailsInput
                label="skills"
                value={employeeStore
                    .getEmployee(selectedEmployeeStore.selectedId)
                    .skills.join(',')}
            />
            <DetailsInput
                label="interests"
                value={employeeStore
                    .getEmployee(selectedEmployeeStore.selectedId)
                    .interests.join(',')}
            />
            <DetailsInput
                label="college"
                value={
                    employeeStore.getEmployee(selectedEmployeeStore.selectedId)
                        .college
                }
            />
            <DetailsInput
                label="home town"
                value={
                    employeeStore.getEmployee(selectedEmployeeStore.selectedId)
                        .hometown
                }
            />
            <DetailsInput
                label="current town"
                value={
                    employeeStore.getEmployee(selectedEmployeeStore.selectedId)
                        .townOfResidence
                }
            />
            <FormControl style={controlStyle} variant="floating">
                <FormLabel>{'birth day (month and day)'}</FormLabel>
                <input
                    style={pickerStyle}
                    type="date"
                    // value={dateToString(
                    //     employeeStore.getEmployee(
                    //         selectedEmployeeStore.selectedId
                    //     ).birthMonthDay
                    // )}
                />
            </FormControl>
            <DetailsInput
                label="pets"
                value={employeeStore
                    .getEmployee(selectedEmployeeStore.selectedId)
                    .pets.join(',')}
            />
            <FormControl style={controlStyle} variant="floating">
                <FormLabel>{'additional details'}</FormLabel>
                <Input
                    type="text"
                    value={
                        employeeStore.getEmployee(
                            selectedEmployeeStore.selectedId
                        ).pets
                    }
                />
            </FormControl>
        </>
    )
}
