import { useEffect, useState } from 'react'
import { Id } from '../util/Id'
import { useAuthedUserStore, useRootStore } from './RootStoreProvider'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
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
    PopoverBody,
    IconButton,
    FormErrorMessage,
} from '@chakra-ui/react'
import { QuestionOutlineIcon } from '@chakra-ui/icons'

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

async function createUser(credentials) {
    console.log('credentials: ', JSON.stringify(credentials))
    return fetch('http://localhost:3001/createUser', {
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
    const [loginUsername, setLoginUserName] = useState<string>('dardenfall')
    const [loginPassword, setLoginPassword] = useState<string>('coro')
    const [registerFirst, setRegisterFirst] = useState<string>('')
    const [registerLast, setRegisterLast] = useState<string>('')
    const [registerUsername, setRegisterUserName] = useState<string>('')
    const [registerMoniker, setRegisterMoniker] = useState<string>('manager')
    const [registerPassword, setRegisterPassword] = useState<string>('')
    const [registerConfirmPassword, setRegisterConfirmPassword] =
        useState<string>('')
    const [register, setRegister] = useBoolean(false)
    const [storage, setStorage] = useBoolean(false)
    const passwordMatches =
        (registerPassword === '' && registerConfirmPassword) ||
        registerPassword === registerConfirmPassword

    // useEffect(() => {
    //     var input =
    //         document.getElementById('loginPassword') ||
    //         document.getElementById('registerPassword')

    //     input.addEventListener('keypress', function (event) {
    //         if (event.key === 'Enter') {
    //             event.preventDefault()
    //             document.getElementById('submit').click()
    //         }
    //     })
    // })

    const handleLogin = async (e) => {
        e.preventDefault()
        let responseData: { userId: string; token: string } = null

        try {
            responseData = await loginUser({
                username: loginUsername.trim(),
                password: loginPassword.trim(),
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
                <FormControl id="loginUsername" colorScheme={'green'}>
                    <FormLabel>username</FormLabel>
                    <Input onChange={(e) => setLoginUserName(e.target.value)} />
                </FormControl>
                <FormControl id="loginPassword" colorScheme={'green'}>
                    <FormLabel>password</FormLabel>
                    <Input
                        type="password"
                        onChange={(e) => setLoginPassword(e.target.value)}
                    />
                </FormControl>
                <Stack spacing={10}>
                    <Center>
                        <Link color={'green.600'}>forgot password?</Link>
                    </Center>

                    <Button
                        bg={'green.600'}
                        color={'white'}
                        _hover={{
                            bg: 'green.500',
                        }}
                        onClick={handleLogin}
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
                        <FormLabel>first name *</FormLabel>
                        <Input
                            onChange={(e) => setRegisterFirst(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id="last" colorScheme={'green'}>
                        <FormLabel>last name *</FormLabel>
                        <Input
                            onChange={(e) => setRegisterLast(e.target.value)}
                        />
                    </FormControl>
                </HStack>
                <FormControl id="registerUsername" colorScheme={'green'}>
                    <FormLabel>username *</FormLabel>
                    <Input
                        onChange={(e) => setRegisterUserName(e.target.value)}
                    />
                </FormControl>
                <FormControl id="password" colorScheme={'green'}>
                    <FormLabel>password *</FormLabel>
                    <Input
                        id="registerPassword"
                        type="password"
                        onChange={(e) => setRegisterPassword(e.target.value)}
                    />
                </FormControl>
                <FormControl
                    id="confirmPassword"
                    colorScheme={'green'}
                    isInvalid={!passwordMatches}
                >
                    <FormLabel>confirm password *</FormLabel>
                    <Input
                        type="password"
                        onChange={(e) =>
                            setRegisterConfirmPassword(e.target.value)
                        }
                    />

                    <FormErrorMessage>password does not match</FormErrorMessage>
                </FormControl>
                <FormControl display="flex" alignItems="center">
                    <FormLabel ml={'10'} htmlFor="register" mb="0">
                        browser storage
                    </FormLabel>
                    <Switch
                        colorScheme="green"
                        color={'green'}
                        onChange={() => setStorage.toggle()}
                        id="storage"
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
                        onClick={createUser}
                        id="create"
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
                                onChange={() => setRegister.toggle()}
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
