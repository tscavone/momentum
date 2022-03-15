import { Box, Divider, Heading, HStack, Select, VStack } from '@chakra-ui/react'
import { useSettingsStore } from './RootStoreProvider'

export const StretchQuesitonTab = () => {
    const settingsStore = useSettingsStore()

    return (
        <Box>
            <VStack>
                <Heading as="h4" size="md">
                    Stretch Questions
                </Heading>
                <Divider orientation="horizontal" />
                <Select>
                    {settingsStore
                        .getByEntryName('stretch questions')[1]
                        .map((setting) => (
                            <option value={setting.id.id}>
                                {setting.value}
                            </option>
                        ))}
                </Select>
            </VStack>
        </Box>
    )
}
