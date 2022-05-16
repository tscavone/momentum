import {
    Box,
    Button,
    Container,
    Link,
    Stack,
    useColorModeValue,
} from '@chakra-ui/react'

export function Footer() {
    return (
        <Box
            bg={useColorModeValue('gray.50', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}
        >
            <Container
                marginLeft={'80'}
                as={Stack}
                maxW={'5xl'}
                py={4}
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justify={{ base: 'center', md: 'space-between' }}
                align={{ base: 'center', md: 'center' }}
            >
                <Stack direction={'row'} spacing={6}>
                    <Link href={'#'}>contact</Link>
                </Stack>
                <Box>
                    <Button colorScheme={'green'}>save all</Button>
                </Box>
            </Container>
        </Box>
    )
}
