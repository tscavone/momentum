import {
    Button,
    FormHelperText,
    FormLabel,
    HStack,
    Input,
    Select,
    Textarea,
} from '@chakra-ui/react'
import { SettingsEntry, SettingsType } from '../value_objects/SettingsEntry'
import { SettingsValue } from '../value_objects/SettingsValue'
import { FiMinus, FiPlus } from 'react-icons/fi'
import { SettingsValueWithDesc } from '../value_objects/SettingsValueWithDesc'

export const SettingsInput = ({
    settingsEntryAndValues,
}: {
    settingsEntryAndValues: [SettingsEntry, SettingsValue[]]
}) => {
    const inputStyle = { width: '80%', margin: '10px' }

    const getInput = (
        settingsEntryAndValues: [SettingsEntry, SettingsValue[]]
    ) => {
        const settingsEntry = settingsEntryAndValues[0]
        const settingsValues = settingsEntryAndValues[1]

        if (settingsEntry.type === SettingsType.select) {
            return (
                <Select>
                    {settingsEntry.potentialValues.map((potentialValue) => (
                        <option value={potentialValue}>{potentialValue}</option>
                    ))}
                </Select>
            )
        } else if (settingsEntry.type === SettingsType.multiple) {
            return (
                <>
                    {settingsValues.map((settingsValue) => (
                        <div key={settingsValue.id.id}>
                            <HStack m="2">
                                <Input
                                    type="text"
                                    readOnly
                                    value={settingsValue.value}
                                    style={inputStyle}
                                />
                                <Button size="xs">
                                    <FiMinus />
                                </Button>
                            </HStack>
                            {settingsValue instanceof SettingsValueWithDesc ? (
                                <Textarea ml={5} width="78%" size={'sm'}>
                                    {settingsValue.description}
                                </Textarea>
                            ) : (
                                <></>
                            )}
                        </div>
                    ))}
                    <HStack m="2">
                        <Input
                            placeholder="enter new value..."
                            style={inputStyle}
                        />
                        <Button size="xs">
                            <FiPlus />
                        </Button>
                    </HStack>
                    {settingsValues[0] instanceof SettingsValueWithDesc ? (
                        <Textarea ml={5} width="78%" size={'sm'}></Textarea>
                    ) : (
                        <></>
                    )}
                </>
            )
        } else {
        }
    }

    const settingsEntry: SettingsEntry = settingsEntryAndValues[0]
    return (
        <details>
            <summary>{settingsEntry.name}</summary>

            {getInput(settingsEntryAndValues)}
            <FormHelperText>{settingsEntry.description}</FormHelperText>
        </details>
    )
}
