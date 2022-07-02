import { Box, Container, VStack } from '@chakra-ui/react'
import { StretchAnswer } from '../../value_objects/StretchAnswer'
import { useSettingsStore } from '../RootStoreProvider'
import { ReportContainer } from './ReportContainer'

// a component to display a Note in the report drawer
export const StretchReport = ({
    stretchAnswer,
}: {
    stretchAnswer: StretchAnswer
}) => {
    const settingsStore = useSettingsStore()

    const stretchQuestion = settingsStore.getValueById(
        stretchAnswer.questionId.id
    )

    return (
        <ReportContainer reportName="stretch question" iconName="FiEdit">
            <Box width="95%">
                <details>
                    <summary>{stretchQuestion.value}</summary>
                    <Container
                        dangerouslySetInnerHTML={{
                            __html: stretchAnswer.answer,
                        }}
                    ></Container>
                </details>
            </Box>
        </ReportContainer>
    )
}
