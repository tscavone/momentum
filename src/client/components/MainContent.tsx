import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
} from '@chakra-ui/react'
import { SummaryPanel } from './SummaryPanel'
import { TabContainer } from './TabContainer'

export const MainContent = () => {
    return (
        <main>
            <Accordion allowToggle allowMultiple defaultIndex={[0, 1]}>
                <AccordionItem>
                    <SummaryPanel />
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box flex="1" textAlign="left">
                                Current Updates
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <TabContainer />
                    </AccordionPanel>
                </AccordionItem>{' '}
            </Accordion>
        </main>
    )
}
