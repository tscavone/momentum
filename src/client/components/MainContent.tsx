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
import { useCurrentDateStore } from './RootStoreProvider'

export const MainContent = () => {
    const currentDateStore = useCurrentDateStore()

    return (
        <main>
            <Accordion
                allowToggle
                allowMultiple
                defaultIndex={[0, 1]}
                margin={'0px'}
            >
                <AccordionItem color={'white'} bg={'green.500'}>
                    <SummaryPanel />
                </AccordionItem>
                <AccordionItem border={'0px'}>
                    <AccordionButton
                        height={'2'}
                        dropShadow={'dark-lg'}
                        border={'0px'}
                    >
                        <AccordionIcon color={'green.800'} />
                    </AccordionButton>

                    <AccordionPanel pb={4}>
                        <TabContainer />
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </main>
    )
}
