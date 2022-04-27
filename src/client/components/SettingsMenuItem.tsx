import {
    Box,
    Button,
    FormControl,
    MenuItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import { SettingsStore } from '../stores/SettingsStore'
import { SettingsEntry } from '../value_objects/SettingsEntry'
import { SettingsValue } from '../value_objects/SettingsValue'
import { SettingsValueWithDesc } from '../value_objects/SettingsValueWithDesc'
import { SettingsInput } from './SettingsInput'

export const SettingsMenuItem = ({
    origSettings,
}: {
    origSettings: Map<string, [SettingsEntry, SettingsValue[]]>
}) => {
    const [settings, setSettings] = React.useState<
        [SettingsEntry, SettingsValue[]][]
    >(Array.from(origSettings.values()))

    const {
        isOpen: isSettingsOpen,
        onOpen: onSettingsOpen,
        onClose: onSettingsClosed,
    } = useDisclosure()

    const removeValue = (event) => {
        let newSettings: [SettingsEntry, SettingsValue[]][] = []

        //create array copy for react
        for (const setting of settings) {
            newSettings.push([setting[0], [...setting[1]]])
        }

        for (const setting of newSettings) {
            const foundIndex = setting[1].findIndex(
                (settingValue) =>
                    settingValue.id.id === event.currentTarget.value
            )

            if (foundIndex !== -1) {
                setting[1].splice(foundIndex, 1)
                setSettings(newSettings)
                return
            }
        }
        throw new Error(
            'SettingsMenuItem: did not find item to remove:' +
                event.currentTarget.value
        )
    }

    const addValue = (event) => {
        let settingEntryId = event.currentTarget.value

        const newNameField: HTMLInputElement | null = document.getElementById(
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
    }

    return (
        <>
            <MenuItem
                data-testid="openSettingsMenuDialog"
                onClick={onSettingsOpen}
            >
                settings
            </MenuItem>

            <Modal isOpen={isSettingsOpen} onClose={onSettingsClosed}>
                <ModalOverlay />
                <ModalContent maxW="48rem">
                    <ModalHeader>settings</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            {settings.map((settingsEntry) => {
                                return (
                                    <Box
                                        p="2"
                                        key={'box' + settingsEntry[0].id}
                                    >
                                        <SettingsInput
                                            settingsEntryAndValues={
                                                settingsEntry
                                            }
                                            removeValue={removeValue}
                                            addValue={addValue}
                                        ></SettingsInput>
                                    </Box>
                                )
                            })}
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="green"
                            mr={3}
                            onClick={onSettingsClosed}
                        >
                            save
                        </Button>
                        <Button variant="ghost">close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
