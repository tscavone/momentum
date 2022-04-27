import {
    Button,
    FormHelperText,
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
    removeValue,
    addValue,
}: {
    settingsEntryAndValues: [SettingsEntry, SettingsValue[]]
    removeValue: (event) => void
    addValue: (event) => void
}) => {
    const inputStyle = { width: '80%', margin: '10px' }

    const getInput = (
        settingsEntryAndValues: [SettingsEntry, SettingsValue[]]
    ) => {
        const settingsEntry = settingsEntryAndValues[0]

        if (settingsEntry.type === SettingsType.select) {
            return (
                <Select key={settingsEntry.id.id}>
                    {settingsEntry.potentialValues.map((potentialValue) => (
                        <option key={potentialValue} value={potentialValue}>
                            {potentialValue}
                        </option>
                    ))}
                </Select>
            )
        } else if (settingsEntry.type === SettingsType.multiple) {
            return (
                <>
                    {settingsEntryAndValues[1]
                        .filter(
                            (settingsValue) => settingsValue.deleted !== true
                        )
                        .map((settingsValue) => (
                            <div key={settingsValue.id.id}>
                                <HStack m="2">
                                    <Input
                                        type="text"
                                        readOnly
                                        value={settingsValue.value}
                                        style={inputStyle}
                                    />
                                    <Button
                                        size="xs"
                                        value={settingsValue.id.id}
                                        onClick={removeValue}
                                    >
                                        <FiMinus />
                                    </Button>
                                </HStack>
                                {settingsValue instanceof
                                SettingsValueWithDesc ? (
                                    <Textarea
                                        ml={5}
                                        width="78%"
                                        size={'sm'}
                                        defaultValue={settingsValue.description}
                                        readOnly
                                    ></Textarea>
                                ) : (
                                    <></>
                                )}
                            </div>
                        ))}
                    <HStack m="2">
                        <Input
                            placeholder="enter new value..."
                            style={inputStyle}
                            id={'newSettingName-' + settingsEntry.id.id}
                        />
                        <Button
                            onClick={addValue}
                            size="xs"
                            value={settingsEntry.id.id}
                        >
                            <FiPlus />
                        </Button>
                    </HStack>
                    {settingsEntryAndValues[1][0] instanceof
                    SettingsValueWithDesc ? (
                        <Textarea
                            ml={5}
                            width="78%"
                            size={'sm'}
                            id={'newSettingDesc-' + settingsEntry.id.id}
                        ></Textarea>
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
