import {
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Tooltip,
} from '@chakra-ui/react'
import {
    CheckIcon,
    ChevronUpIcon,
    EditIcon,
    ExternalLinkIcon,
    InfoOutlineIcon,
    QuestionOutlineIcon,
    TimeIcon,
} from '@chakra-ui/icons'
import { StretchQuesitonTab } from './tabs/StretchQuestionTab'
import { useSelectedEmployeeStore } from './RootStoreProvider'
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
                    <ChevronUpIcon marginLeft="5px" />
                </Tooltip>
            )}
        </Tab>
    )
})
