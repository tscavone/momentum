import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
} from '@chakra-ui/react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { Footer } from './client/components/Footer'
import { TabContainer } from './client/components/TabContainer'
import { TopNav } from './client/components/TopNav'

const DateState = observable({
    currentDate: null,
})

const App = observer(() => {
    return (
        <div className="App">
            <Box>
                <TopNav>
                    <Accordion allowToggle allowMultiple defaultIndex={[0, 1]}>
                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <Box flex="1" textAlign="left">
                                        Section 1 title
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}></AccordionPanel>
                        </AccordionItem>

                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <Box flex="1" textAlign="left">
                                        Section 2 title
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <TabContainer />
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </TopNav>
                <Footer />
            </Box>
        </div>
    )
})

export default App
