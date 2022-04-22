import React, { ReactNode, useRef } from 'react'
import {
    IconButton,
    Avatar,
    Box,
    CloseButton,
    Flex,
    HStack,
    VStack,
    Icon,
    useColorModeValue,
    Link,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
    BoxProps,
    FlexProps,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Select,
    Spacer,
} from '@chakra-ui/react'
import {
    FiSettings,
    FiMenu,
    FiChevronDown,
    FiUserPlus,
    FiLink2,
    FiInfo,
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import { ReactText } from 'react'
import {
    useAuthedUserStore,
    useEmployeeStore,
    useSelectedEmployeeStore,
} from './RootStoreProvider'

interface LinkItemProps {
    name: string
    icon: IconType
}
const LinkItems: Array<LinkItemProps> = [
    { name: 'new employee', icon: FiUserPlus },
    { name: 'links', icon: FiLink2 },
    { name: 'settings', icon: FiSettings },
    { name: 'about', icon: FiInfo },
]

export function MainNav({ children }: { children: ReactNode }) {
    const {
        isOpen,
        onOpen: onSidebarOpen,
        onClose: onSidebarClose,
    } = useDisclosure()
    return (
        <Box minH="70vh">
            <SidebarContent
                onSidebarClose={() => onSidebarClose}
                display={{ base: 'none', md: 'block' }}
            />
            {/* mobilenav */}
            <MobileNav onSidebarOpen={onSidebarOpen} />
            <Box ml={{ base: 0, md: 60 }}>{children}</Box>
        </Box>
    )
}

interface SidebarProps extends BoxProps {
    onSidebarClose: () => void
}

const SidebarContent = ({ onSidebarClose, ...rest }: SidebarProps) => {
    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue('white', 'green.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('green.200', 'green.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex
                h="20"
                alignItems="center"
                mx="8"
                justifyContent="space-between"
            >
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    momentum
                </Text>
                <CloseButton
                    display={{ base: 'flex', md: 'none' }}
                    onClick={onSidebarClose}
                />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem key={link.name} icon={link.icon}>
                    {link.name}
                </NavItem>
            ))}
        </Box>
    )
}

interface NavItemProps extends FlexProps {
    icon: IconType
    children: ReactText
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
    return (
        <Link
            href="#"
            style={{ textDecoration: 'none' }}
            _focus={{ boxShadow: 'none' }}
        >
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'green.400',
                    color: 'white',
                }}
                {...rest}
            >
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    )
}

interface MobileProps extends FlexProps {
    onSidebarOpen: () => void
}
const MobileNav = ({ onSidebarOpen, ...rest }: MobileProps) => {
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
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'green.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('green.200', 'green.700')}
            //            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            justifyContent={{ base: 'space-between' }}
            {...rest}
        >
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Text
                display={{ base: 'flex', md: 'none' }}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold"
            >
                momentum
            </Text>

            <HStack spacing={{ base: '0', md: '6' }}>
                <Flex alignItems={'center'}>
                    <Box>
                        <Select
                            maxWidth="300px"
                            colorScheme={'green'}
                            onChange={updateUserSelector}
                            defaultValue={selectedEmployeeStore.selectedId}
                        >
                            {getEmployeeSelectorOptions()}
                        </Select>
                    </Box>
                    <Spacer />
                    <Box>
                        <Menu>
                            <MenuButton
                                py={2}
                                transition="all 0.3s"
                                _focus={{ boxShadow: 'none' }}
                                minWidth="150px"
                            >
                                <HStack>
                                    <Avatar
                                        size={'sm'}
                                        src={
                                            'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                                        }
                                    />
                                    <VStack
                                        display={{ base: 'none', md: 'flex' }}
                                        alignItems="flex-start"
                                        spacing="1px"
                                        ml="2"
                                    >
                                        <Text fontSize="sm">Justina Clark</Text>
                                        <Text fontSize="xs" color="green.600">
                                            Admin
                                        </Text>
                                    </VStack>
                                    <Box display={{ base: 'none', md: 'flex' }}>
                                        <FiChevronDown />
                                    </Box>
                                </HStack>
                            </MenuButton>
                            <MenuList
                                bg={useColorModeValue('white', 'green.900')}
                                borderColor={useColorModeValue(
                                    'green.200',
                                    'green.700'
                                )}
                            >
                                <MenuItem>profile</MenuItem>
                                <MenuDivider />
                                <MenuItem>sign out</MenuItem>
                            </MenuList>
                        </Menu>
                    </Box>
                </Flex>
            </HStack>
        </Flex>
    )
}