import {
    Box,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Stack,
    Link,
    Container,
    useColorModeValue,
} from '@chakra-ui/react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { TopNav } from './client/components/TopNav'
import { NotesTab } from './client/components/NotesTab'
import {
    CheckIcon,
    EditIcon,
    ExternalLinkIcon,
    InfoOutlineIcon,
    QuestionOutlineIcon,
    TimeIcon,
} from '@chakra-ui/icons'
import { StretchQuesitonTab } from './client/components/StretchQuestionTab'

const DateState = observable({
    currentDate: null,
})

const iconStyle = {
    marginRight: '5px',
}

function SmallWithNavigation() {
    return (
        <Box
            bg={useColorModeValue('gray.50', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}
        >
            <Container
                as={Stack}
                maxW={'6xl'}
                py={4}
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justify={{ base: 'center', md: 'space-between' }}
                align={{ base: 'center', md: 'center' }}
            >
                <Stack direction={'row'} spacing={6}>
                    <Link href={'#'}>Home</Link>
                    <Link href={'#'}>About</Link>
                    <Link href={'#'}>Blog</Link>
                    <Link href={'#'}>Contact</Link>
                </Stack>
            </Container>
        </Box>
    )
}

const App = observer(() => {
    return (
        <div className="App">
            <Box>
                <TopNav>
                    <Tabs size="md" variant="enclosed">
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
                </TopNav>
                <SmallWithNavigation />
            </Box>
        </div>
    )
})

export default App
