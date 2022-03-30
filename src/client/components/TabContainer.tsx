import { NotesTab } from './NotesTab'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import {
    CheckIcon,
    EditIcon,
    ExternalLinkIcon,
    InfoOutlineIcon,
    QuestionOutlineIcon,
    TimeIcon,
} from '@chakra-ui/icons'
import { StretchQuesitonTab } from './StretchQuestionTab'

export const TabContainer = () => {
    const iconStyle = {
        marginRight: '5px',
    }

    return (
        <Tabs size="md" variant="enclosed" colorScheme={'green'}>
            <TabList>
                <Tab>
                    <EditIcon style={iconStyle} />
                    Notes
                </Tab>
                <Tab>
                    <QuestionOutlineIcon style={iconStyle} />
                    Stretch
                </Tab>
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
}
