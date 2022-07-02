//

import { Box, Center, Stack, useColorModeValue, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { FiEdit } from 'react-icons/fi'

export const ReportContainer = ({
    reportName,
    iconName,
    children,
}: {
    reportName: string
    iconName: string
    children: ReactNode
}) => {
    const Icon = `${iconName}` // fix this
    return (
        <Center py={3}>
            <Box
                w={[250, 500]}
                bg={useColorModeValue('white', 'green.900')}
                boxShadow={'xl'}
                rounded={'md'}
                p={6}
                overflow={'hidden'}
            >
                <Box
                    bg={'green.100'}
                    mt={-6}
                    mx={-6}
                    mb={2}
                    pos={'relative'}
                    p={2}
                >
                    <Icon />
                </Box>
                <Stack>
                    <Text
                        color={'green.500'}
                        fontWeight={800}
                        fontSize={'sm'}
                        letterSpacing={1.1}
                    >
                        {reportName}
                    </Text>
                    {children}
                </Stack>
            </Box>
        </Center>
    )
}
