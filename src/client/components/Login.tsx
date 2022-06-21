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
    Spinner,
    useToast,
} from '@chakra-ui/react'
import { QuestionOutlineIcon } from '@chakra-ui/icons'
import {
    QueryResponse,
    LoginRequest,
    LoginPayload,
} from '../../shared/data_definitions/NetworkDefinitions'
import { IDataUser } from '../../shared/data_definitions/AuthedUserDefinitions'

async function queryServer(path: string, payload: object) {
    const hostString = process.env.REACT_APP_HOSTSTRING

    if (!hostString) {
        throw new Error('HOSTSTRING not defined')
    }

    return fetch(`${hostString}/${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
        .then((response) => response.json())
        .then((jsonResponse: QueryResponse) => {
            console.log('query response (client side): ', jsonResponse)
            if (jsonResponse.errorMessage) {
                throw Error(jsonResponse.errorMessage)
            }
            return jsonResponse
        })
}

export default function Login() {
    const authedUserStore = useAuthedUserStore()
    const rootStore = useRootStore()

    const [loginUsername, setLoginUserName] = useState<string>('dardenfall')
    const [loginPassword, setLoginPassword] = useState<string>('coro')
    const [registerFirst, setRegisterFirst] = useState<string>('')
    const [registerLast, setRegisterLast] = useState<string>('')
    const [registerUsername, setRegisterUserName] = useState<string>('')
    const [registerEmail, setEmail] = useState<string>('')
    const [registerPassword, setRegisterPassword] = useState<string>('')
    const [registerConfirmPassword, setRegisterConfirmPassword] =
        useState<string>('')
    const [register, setRegister] = useBoolean(false)
    const [serverStorage, setStorage] = useBoolean(false)
    const [loading, setLoading] = useBoolean(false)

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

    const toast = useToast()

    const handleLogin = async (e) => {
        e.preventDefault()
        let responseData: QueryResponse = null
        let loginRequest: LoginRequest = {
            username: loginUsername.trim(),
            password: loginPassword.trim(),
        }

        responseData = await queryServer('login', loginRequest)
        let loginPayload: LoginPayload = responseData.payload as LoginPayload

        rootStore.initialize(Id.fromString(loginPayload.userId))

        authedUserStore.token = loginPayload.token
        authedUserStore.userId = Id.fromString(loginPayload.userId)
    }

    const handleSignup = async (e) => {
        e.preventDefault()
        let responseData: QueryResponse = null
        let newUser: IDataUser = {
            _id: new Id().id,
            username: registerUsername.trim(),
            password: registerPassword.trim(),
            first: registerFirst.trim(),
            last: registerLast.trim(),
            email: registerEmail.trim(),
        }
        responseData = await queryServer('signup', newUser)

        let signupPayload: LoginPayload = responseData.payload as LoginPayload
        rootStore.initializeNewUser(newUser, !serverStorage)
        authedUserStore.token = signupPayload.token
        authedUserStore.userId = Id.fromString(signupPayload.userId)

        console.log('error logging in :  ', e)
        return
    }

    const getLoginComponent = () => {
        return (
            <Stack spacing={4}>
                <FormControl
                    id="loginUsername"
                    colorScheme={'green'}
                    isRequired
                >
                    <FormLabel>username</FormLabel>
                    <Input onChange={(e) => setLoginUserName(e.target.value)} />
                </FormControl>
                <FormControl
                    id="loginPassword"
                    colorScheme={'green'}
                    isRequired
                >
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
                        isDisabled={loading ? true : false}
                        onClick={async (e) => {
                            try {
                                setLoading.on()
                                await handleLogin(e)
                            } catch (err) {
                                toast({
                                    title: 'login failed',
                                    description: err.message,
                                    status: 'error',
                                    duration: 5000,
                                    isClosable: true,
                                })
                            } finally {
                                setLoading.off()
                            }
                        }}
                        id="submit"
                    >
                        {loading ? <Spinner></Spinner> : 'sign in'}
                    </Button>
                </Stack>
            </Stack>
        )
    }

    const getRegisterComponent = () => {
        return (
            <Stack spacing={4}>
                <HStack>
                    <FormControl id="first" colorScheme={'green'} isRequired>
                        <FormLabel>first name</FormLabel>
                        <Input
                            onChange={(e) => setRegisterFirst(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id="last" colorScheme={'green'}>
                        <FormLabel>last name</FormLabel>
                        <Input
                            onChange={(e) => setRegisterLast(e.target.value)}
                        />
                    </FormControl>
                </HStack>
                <FormControl
                    id="registerUsername"
                    colorScheme={'green'}
                    isRequired
                >
                    <FormLabel>username</FormLabel>
                    <Input
                        onChange={(e) => setRegisterUserName(e.target.value)}
                    />
                </FormControl>
                <FormControl id="email" colorScheme={'green'} isRequired>
                    <FormLabel>email</FormLabel>
                    <Input
                        id="email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
                <FormControl id="password" colorScheme={'green'} isRequired>
                    <FormLabel>password</FormLabel>
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
                    isRequired
                >
                    <FormLabel>confirm password</FormLabel>
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
                        isDisabled={loading ? true : false}
                        onClick={async (e) => {
                            try {
                                setLoading.on()
                                await handleSignup(e)
                            } catch (err) {
                                toast({
                                    title: 'signup failed',
                                    description: err.message,
                                    status: 'error',
                                    duration: 5000,
                                    isClosable: true,
                                })
                            } finally {
                                setLoading.off()
                            }
                        }}
                        id="create"
                    >
                        {loading ? <Spinner></Spinner> : 'register'}
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
                    {register ? getRegisterComponent() : getLoginComponent()}
                </Box>
            </Stack>
        </Flex>
    )
}
