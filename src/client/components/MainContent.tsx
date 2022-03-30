import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
} from '@chakra-ui/react'
import { DatePicker } from './DatePicker'
import { SummaryPanel } from './SummaryPanel'
import { TabContainer } from './TabContainer'
import { useCurrentDateStore } from './RootStoreProvider'

export const MainContent = () => {
    const currentDateStore = useCurrentDateStore()

    return (
        <main>
            <Accordion allowToggle allowMultiple defaultIndex={[0, 1]}>
                <AccordionItem>
                    <SummaryPanel />
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton height={'2'} dropShadow={'dark-lg'}>
                            <AccordionIcon color={'green.800'} />
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
