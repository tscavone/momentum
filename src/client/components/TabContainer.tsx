import { NotesTab } from './tabs/NotesTab'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import {
    FiCheckSquare,
    FiEdit,
    FiExternalLink,
    FiInfo,
    FiMessageCircle,
    FiClock,
} from 'react-icons/fi'
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
                    <FiClock style={iconStyle} />
                    Follow Ups
                </Tab>
                <TabButton
                    infoStore={statusAndGoalsStore}
                    name={'goals'}
                    icon={<FiCheckSquare style={iconStyle} />}
                />
                <Tab>
                    <FiAlertTriangle style={iconStyle} />
                    Issues
                </Tab>
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
                    <FiInfo style={iconStyle} />
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
