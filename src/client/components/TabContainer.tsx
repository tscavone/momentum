import { NotesTab } from './NotesTab'
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
import { StretchQuesitonTab } from './StretchQuestionTab'
import {
    useNoteStore,
    useSelectedEmployeeStore,
    useStretchAnswerStore,
} from './RootStoreProvider'
import { observer } from 'mobx-react'
import { TabButton } from './TabButton'

export const TabContainer = observer(() => {
    const noteStore = useNoteStore()
    const stretchAnswerStore = useStretchAnswerStore()
    const selectedEmployeeStore = useSelectedEmployeeStore()
    const iconStyle = {
        marginRight: '5px',
    }

    return (
        <Tabs size="md" variant="enclosed" colorScheme={'green'}>
            <TabList>
                <TabButton
                    infoStore={noteStore}
                    name={'notes'}
                    icon={<EditIcon style={iconStyle}></EditIcon>}
                />
                <TabButton
                    infoStore={stretchAnswerStore}
                    name={'stretch'}
                    icon={
                        <QuestionOutlineIcon
                            style={iconStyle}
                        ></QuestionOutlineIcon>
                    }
                />

                <Tab>
                    <TimeIcon style={iconStyle} />
                    Follow Ups
                </Tab>
                <Tab>
                    <CheckIcon style={iconStyle} />
                    Goals
                </Tab>
                <Tab>
                    <ExternalLinkIcon style={iconStyle} />
                    Integration
                </Tab>
                <Tab>
                    <InfoOutlineIcon style={iconStyle} />
                    Details
                </Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <NotesTab />
                </TabPanel>
                <TabPanel>
                    <StretchQuesitonTab />
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
})
