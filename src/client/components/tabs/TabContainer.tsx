import { NotesTab } from './NotesTab'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import {
    FiCheckSquare,
    FiEdit,
    FiExternalLink,
    FiInfo,
    FiMessageCircle,
    FiClock,
    FiUser,
} from 'react-icons/fi'
import { StretchQuesitonTab } from './StretchQuestionTab'
import {
    useNoteStore,
    useStatusAndGoalsStore,
    useStretchAnswerStore,
} from '../RootStoreProvider'
import { observer } from 'mobx-react'
import { TabButton } from './TabButton'
import { GoalsTab } from './GoalsTab'
import { FiAlertTriangle } from 'react-icons/fi'
import { DetailsTab } from './DetailsTab'
import { FollowUpsTab } from './FollowUpsTab'
import { IntegrationTab } from './IntegrationTab'
import { IssuesTab } from './IssuesTab'

export const TabContainer = observer(() => {
    const noteStore = useNoteStore()
    const stretchAnswerStore = useStretchAnswerStore()
    const statusAndGoalsStore = useStatusAndGoalsStore()
    const iconStyle = {
        marginRight: '5px',
    }

    return (
        <Tabs
            size="md"
            variant="enclosed"
            colorScheme={'green'}
            isLazy
            defaultIndex={2}
        >
            <TabList>
                <Tab>
                    <FiClock style={iconStyle} />
                    Follow Ups
                </Tab>
                <Tab>
                    <FiAlertTriangle style={iconStyle} />
                    Issues
                </Tab>
                <TabButton
                    infoStore={statusAndGoalsStore}
                    name={'goals'}
                    icon={<FiCheckSquare style={iconStyle} />}
                />
                <TabButton
                    infoStore={stretchAnswerStore}
                    name={'stretch'}
                    icon={<FiMessageCircle style={iconStyle}></FiMessageCircle>}
                />
                <TabButton
                    infoStore={noteStore}
                    name={'notes'}
                    icon={<FiEdit style={iconStyle}></FiEdit>}
                />
                <Tab>
                    <FiExternalLink style={iconStyle} />
                    Integration
                </Tab>
                <Tab>
                    <FiUser style={iconStyle} />
                    Details
                </Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <FollowUpsTab />
                </TabPanel>
                <TabPanel>
                    <IssuesTab />
                </TabPanel>
                <TabPanel>
                    <GoalsTab />
                </TabPanel>
                <TabPanel>
                    <StretchQuesitonTab />
                </TabPanel>
                <TabPanel>
                    <NotesTab />
                </TabPanel>
                <TabPanel>
                    <IntegrationTab />
                </TabPanel>
                <TabPanel>
                    <DetailsTab />
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
})
