//
// based on https://chakra-templates.dev/navigation/navbar
//

import { ReactNode, useRef } from 'react'
import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    Heading,
    Select,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, ViewIcon } from '@chakra-ui/icons'
import { ReportDrawer } from './reportComponents/ReportDrawer'
import {
    useAuthedUserStore,
    useEmployeeStore,
    useSelectedEmployeeStore,
} from './RootStoreProvider'

const Links = ['links', 'settings']

const NavLink = ({ children }: { children: ReactNode }) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={'#'}
    >
        {children}
    </Link>
)

export function TopNav({ children }: { children: ReactNode }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {
        isOpen: isDrawerOpen,
        onOpen: onDrawerOpen,
        onClose: onDrawerClose,
    } = useDisclosure()
    const reportButtonRef = useRef<HTMLButtonElement>(null)
    const selectedEmployeeStore = useSelectedEmployeeStore()
    const employeeStore = useEmployeeStore()
    const authedUserStore = useAuthedUserStore()
    const updateUserSelector = (e: React.ChangeEvent<HTMLSelectElement>) => {
        selectedEmployeeStore.selectedId = e.currentTarget.value
    }

    const getEmployeeSelectorOptions = (): ReactNode[] => {
        let returnValues: ReactNode[] = []

        employeeStore.employees.forEach((employee, id) => {
            returnValues.push(
                <option
                    key={id}
                    value={id}
                >{`${employee.first} ${employee.last}`}</option>
            )
        })

        return returnValues
    }

    return (
        <>
            <Box bg={useColorModeValue('gray.50', 'gray.900')} px={4}>
                <Flex
                    h={16}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                >
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={6} alignItems={'center'}>
                        <Heading>momentum</Heading>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}
                        >
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'}>
                        <Select
                            variant="flushed"
                            maxWidth="300px"
                            colorScheme={'green'}
                            onChange={updateUserSelector}
                            defaultValue={selectedEmployeeStore.selectedId}
                        >
                            {getEmployeeSelectorOptions()}
                        </Select>
                        <Button
                            variant={'solid'}
                            colorScheme={'green'}
                            mr={4}
                            leftIcon={<ViewIcon />}
                            ref={reportButtonRef}
                            onClick={onDrawerOpen}
                            margin={4}
                            padding={5}
                        >
                            Report
                        </Button>
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}
                            >
                                <Avatar
                                    size={'sm'}
                                    src={
                                        'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                                    }
                                />
                            </MenuButton>
                            <MenuList>
                                <MenuItem>settings</MenuItem>
                                <MenuDivider />
                                <MenuItem
                                    onClick={() => authedUserStore.logout()}
                                >
                                    logout
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>

            <ReportDrawer
                isOpen={isDrawerOpen}
                onOpen={onDrawerOpen}
                onClose={onDrawerClose}
            />

            {children}
        </>
    )
}
