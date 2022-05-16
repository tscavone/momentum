import React, { useEffect, useState } from 'react'
import { Id } from '../util/Id'
import { useAuthedUserStore, useRootStore } from './RootStoreProvider'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'

async function loginUser(credentials) {
    console.log('credentials: ', JSON.stringify(credentials))
    return fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    }).then((data) => data.json())
}

export default function Login() {
    const authedUserStore = useAuthedUserStore()
    const rootStore = useRootStore()
    const [username, setUserName] = useState<string>('dardenfall')
    const [password, setPassword] = useState<string>('coro')
    useEffect(() => {
        var input = document.getElementById('password')

        input.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault()
                document.getElementById('submit').click()
            }
        })
    })
    const handleSubmit = async (e) => {
        e.preventDefault()
        let responseData: { userId: string; token: string } = null

        try {
            responseData = await loginUser({
                username: username.trim(),
                password: password.trim(),
            })
            console.log('------> logged in')
            rootStore.initialize(Id.fromString(responseData.userId))
            console.log('-------> initialized')
            authedUserStore.token = responseData.token
            authedUserStore.userId = Id.fromString(responseData.userId)
        } catch (e) {
            console.log('error logging in :  ', e)
            return
        }
    }
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('green.50', 'green.800')}
        >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>
                        welcome to {'  '}
                        <Text
                            fontSize="sxl"
                            fontFamily="monospace"
                            fontWeight="bold"
                            color={'green.600'}
                            display={'inline'}
                            fontStyle={'italic'}
                        >
                            momentum
                        </Text>
                    </Heading>
                    <Text fontSize={'lg'} color={'gray.500'}>
                        login below or <Link color={'green.800'}>register</Link>{' '}
                        here
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}
                >
                    <Stack spacing={4}>
                        <FormControl id="email" colorScheme={'green'}>
                            <FormLabel>Email address</FormLabel>
                            <Input
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="password" colorScheme={'green'}>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}
                            >
                                <Checkbox colorScheme={'green'}>
                                    Remember me
                                </Checkbox>
                                <Link color={'green.600'}>
                                    Forgot password?
                                </Link>
                            </Stack>
                            <Button
                                bg={'green.600'}
                                color={'white'}
                                _hover={{
                                    bg: 'green.500',
                                }}
                                onClick={handleSubmit}
                                id="submit"
                            >
                                Sign in
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}
