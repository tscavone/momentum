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
    useBoolean,
    Switch,
    chakra,
    Center,
    HStack,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverBody,
    IconButton,
} from '@chakra-ui/react'
import { QuestionIcon, QuestionOutlineIcon } from '@chakra-ui/icons'
import { FiHelpCircle } from 'react-icons/fi'
import { MdHelp, MdHelpCenter } from 'react-icons/md'

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
    const [confirmPassword, setConfirmPassword] = useState<string>('coro')
    const [register, setRegister] = useBoolean(false)

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

    const getLogin = () => {
        return (
            <Stack spacing={4}>
                <FormControl id="email" colorScheme={'green'}>
                    <FormLabel>Email address</FormLabel>
                    <Input onChange={(e) => setUserName(e.target.value)} />
                </FormControl>
                <FormControl id="password" colorScheme={'green'}>
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>
                <Stack spacing={10}>
                    <Center>
                        <Link color={'green.600'}>Forgot password?</Link>
                    </Center>

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
        )
    }

    const getRegister = () => {
        return (
            <Stack spacing={4}>
                <HStack>
                    <FormControl id="first" colorScheme={'green'}>
                        <FormLabel>First Name</FormLabel>
                        <Input onChange={(e) => setUserName(e.target.value)} />
                    </FormControl>
                    <FormControl id="last" colorScheme={'green'}>
                        <FormLabel>Last Name</FormLabel>
                        <Input onChange={(e) => setUserName(e.target.value)} />
                    </FormControl>
                </HStack>
                <FormControl id="email" colorScheme={'green'}>
                    <FormLabel>Email address</FormLabel>
                    <Input onChange={(e) => setUserName(e.target.value)} />
                </FormControl>
                <FormControl id="password" colorScheme={'green'}>
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>
                <FormControl id="confirmPassword" colorScheme={'green'}>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </FormControl>
                <FormControl display="flex" alignItems="center">
                    <FormLabel ml={'10'} htmlFor="register" mb="0">
                        browser storage
                    </FormLabel>
                    <Switch
                        colorScheme="green"
                        color={'green'}
                        onChange={function () {
                            setRegister.toggle()
                            console.log(register)
                            return register
                        }}
                        id="register"
                    />
                    <chakra.span ml={4}>server storage</chakra.span>
                    <Popover
                        placement="right"
                        colorScheme={'green'}
                        closeOnBlur
                    >
                        <PopoverTrigger>
                            <IconButton
                                variant={'solid'}
                                rounded={'full'}
                                colorScheme="green"
                                aria-label="storage info"
                                icon={<QuestionOutlineIcon />}
                                fontSize={'32px'}
                                size="sm"
                                ml={'2'}
                            />
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverBody
                                bg={'green.600'}
                                shadow="md"
                                rounded="md"
                                maxH="md"
                                color={'gray.50'}
                            >
                                <Text fontStyle={'italic'}>
                                    browser storage
                                </Text>{' '}
                                keeps all data aside from your login information
                                stored in your browser
                                <Text fontStyle={'italic'}>
                                    server storage
                                </Text>{' '}
                                sends your data to the momentum server
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                </FormControl>
                <Stack spacing={10}>
                    <Button
                        bg={'green.600'}
                        color={'white'}
                        _hover={{
                            bg: 'green.500',
                        }}
                        onClick={handleSubmit}
                        id="submit"
                    >
                        Register
                    </Button>
                </Stack>
            </Stack>
        )
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
                    <Center>
                        <FormControl display="flex" alignItems="center">
                            <FormLabel htmlFor="register" mb="0">
                                login
                            </FormLabel>
                            <Switch
                                colorScheme="green"
                                color={'green'}
                                onChange={function () {
                                    setRegister.toggle()
                                    console.log(register)
                                    return register
                                }}
                                id="register"
                            />
                            <chakra.span ml={4}>register</chakra.span>
                        </FormControl>
                    </Center>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}
                >
                    {register ? getRegister() : getLogin()}
                </Box>
            </Stack>
        </Flex>
    )
}
