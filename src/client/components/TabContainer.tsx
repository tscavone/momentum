import { NotesTab } from './tabs/NotesTab'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import {
    CheckIcon,
    EditIcon,
    ExternalLinkIcon,
    InfoOutlineIcon,
    QuestionOutlineIcon,
    TimeIcon,
} from '@chakra-ui/icons'
import { StretchQuesitonTab } from './tabs/StretchQuestionTab'
import {
    useNoteStore,
    useSelectedEmployeeStore,
    useStatusAndGoalsStore,
    useStretchAnswerStore,
} from './RootStoreProvider'
import { observer } from 'mobx-react'
import { TabButton } from './TabButton'
import { GoalsTab } from './tabs/GoalsTab'
import { StatusAndGoalsStore } from '../stores/StatusAndGoalsStore'
import { FiAlertTriangle } from 'react-icons/fi'

export const TabContainer = observer(() => {
    const noteStore = useNoteStore()
    const stretchAnswerStore = useStretchAnswerStore()
    const selectedEmployeeStore = useSelectedEmployeeStore()
    const statusAndGoalsStore = useStatusAndGoalsStore()
    const iconStyle = {
        marginRight: '5px',
    }

    return (
        <Tabs size="md" variant="enclosed" colorScheme={'green'}>
            <TabList>
                <Tab>
                    <TimeIcon style={iconStyle} />
                    Follow Ups
                </Tab>
                <TabButton
                    infoStore={statusAndGoalsStore}
                    name={'goals'}
                    icon={<CheckIcon style={iconStyle} />}
                />
                <Tab>
                    <FiAlertTriangle style={iconStyle} />
                    Issues
                </Tab>
                <TabButton
                    infoStore={stretchAnswerStore}
                    name={'stretch'}
                    icon={
                        <QuestionOutlineIcon
                            style={iconStyle}
                        ></QuestionOutlineIcon>
                    }
                />
                <TabButton
                    infoStore={noteStore}
                    name={'notes'}
                    icon={<EditIcon style={iconStyle}></EditIcon>}
                />
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
                <TabPanel />
                <TabPanel>
                    <GoalsTab />
                </TabPanel>
                <TabPanel />
                <TabPanel>
                    <StretchQuesitonTab />
                </TabPanel>
                <TabPanel>
                    <NotesTab />
                </TabPanel>
                <TabPanel></TabPanel>
            </TabPanels>
        </Tabs>
    )
})
