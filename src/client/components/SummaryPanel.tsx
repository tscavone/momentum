import {
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
    Box,
} from '@chakra-ui/react'
import { useSelectedEmployeeStore } from './RootStoreProvider'

export const SummaryPanel = () => {
    const selectedEmployeeStore = useSelectedEmployeeStore()
    //    const selectedEmployeeStore = useEmployeeStore()

    return (
        <>
            <h2>
                <AccordionButton>
                    <Box flex="1" textAlign="left">
                        {selectedEmployeeStore.selectedId}
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
            </h2>
            <AccordionPanel pb={4}></AccordionPanel>
        </>
    )
}
