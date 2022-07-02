//

import { Text } from '@chakra-ui/react'
import { ReportContainer } from './ReportContainer'

// a component to display a Note in the report drawer
export const StatusReport = ({ status }: { status: string }) => {
    return (
        <ReportContainer reportName="status" iconName="FiInbox">
            <Text color={'gray.900'}>{status}</Text>
        </ReportContainer>
    )
}
