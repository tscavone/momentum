//
// this component represents the notes tab in the main application
//
import {
    useFollowUpStore,
    useSelectedEmployeeStore,
} from '../RootStoreProvider'
import { Box, Button, Center, Heading, HStack, Input } from '@chakra-ui/react'
import { observer } from 'mobx-react'
import { TabPanelContainer } from './TabPanelContainer'
import { Id } from '../../util/Id'
import { ReactNode } from 'react'

export const FollowUpsTab = observer(() => {
    const selectedEmployeeStore = useSelectedEmployeeStore()
    const followUpStore = useFollowUpStore()

    const resolveFollowUp = (event): void => {
        const followUpId = event.target.value

        followUpStore.currentUser = Id.fromString(
            selectedEmployeeStore.selectedId
        )
        followUpStore.resolve(followUpId)
    }

    const getFollowUpComponents = (selectedId): ReactNode[] => {
        const followUpComponents: ReactNode[] = []

        followUpStore.currentUser = Id.fromString(selectedId)

        if (followUpStore.unresolvedFollowups.length === 0) {
            return [
                <Center>
                    <Heading color={'gray.500'} size={'lg'} as={'h5'}>
                        You have no follow ups
                    </Heading>
                </Center>,
            ]
        }
        for (const followUp of followUpStore.unresolvedFollowups) {
            followUpComponents.push(
                <HStack key={followUp.id.id} m={'2'}>
                    <Input type="text" readOnly value={followUp.text} />
                    <Button value={followUp.id.id} onClick={resolveFollowUp}>
                        {' '}
                        resolve
                    </Button>
                </HStack>
            )
        }
        console.log(followUpComponents)
        return followUpComponents
    }

    return (
        <TabPanelContainer title="follow ups" helpText="" tag="follow ups">
            <Box w={[250, 500, 750]}>
                {getFollowUpComponents(selectedEmployeeStore.selectedId).map(
                    (followUpNode) => followUpNode
                )}
            </Box>
        </TabPanelContainer>
    )
})
