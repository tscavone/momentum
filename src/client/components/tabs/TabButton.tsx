import { Tab, Tooltip, Text } from '@chakra-ui/react'
import { useSelectedEmployeeStore } from '../RootStoreProvider'
import { observer } from 'mobx-react'

export const TabButton = observer(({ name, icon, infoStore }) => {
    const selectedEmployeeStore = useSelectedEmployeeStore()

    return (
        <Tab>
            {icon}
            {name}
            {infoStore
                .getCurrent(selectedEmployeeStore.selectedId)
                .isNewlyMinted() ? (
                <></>
            ) : (
                <Tooltip label="This tab has changes that need saving">
                    <Text size="3xl" marginLeft={'5px'}>
                        *
                    </Text>
                </Tooltip>
            )}
        </Tab>
    )
})
