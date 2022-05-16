import {
    Box,
    chakra,
    Divider,
    Flex,
    Heading,
    HStack,
    Popover,
    PopoverAnchor,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    useBoolean,
    VStack,
} from '@chakra-ui/react'
import { ReactNode } from 'react'
import { FiInfo } from 'react-icons/fi'

export const TabPanelContainer = ({
    children,
    title,
    tag,
    helpText,
}: {
    children: ReactNode
    title: string
    tag: string
    helpText: string
}) => {
    const [helpOpen, setHelpOpen] = useBoolean(true)

    return (
        <Popover
            isOpen={helpOpen}
            onOpen={setHelpOpen.on}
            onClose={setHelpOpen.off}
            closeOnBlur={false}
            placement="left"
            autoFocus={false}
            isLazy={true}
            preventOverflow={false}
            strategy={'fixed'}
        >
            <VStack>
                <HStack>
                    <Heading as="h4" size="md">
                        {title}
                    </Heading>
                    <PopoverTrigger>
                        <FiInfo />
                    </PopoverTrigger>
                </HStack>
                <Divider orientation="horizontal" />
                <PopoverAnchor>
                    <Box minH="md" p={'4'}>
                        {children}
                    </Box>
                </PopoverAnchor>
            </VStack>

            <PopoverContent border={'0px'} w="48">
                <PopoverBody>
                    <Box
                        px={4}
                        py={3}
                        bg={'green.600'}
                        shadow="md"
                        rounded="md"
                        maxH="md"
                    >
                        <Flex
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <chakra.span fontSize="sm" color={'white'}>
                                <PopoverTrigger>
                                    <FiInfo></FiInfo>
                                </PopoverTrigger>
                            </chakra.span>
                            <chakra.span
                                bg={'green.800'}
                                color={'gray.200'}
                                px={3}
                                py={1}
                                rounded="full"
                                textTransform="uppercase"
                                fontSize="xs"
                            >
                                {tag}
                            </chakra.span>
                        </Flex>

                        <Box>
                            <chakra.h1
                                fontSize="lg"
                                fontWeight="bold"
                                mt={2}
                                color={'white'}
                            >
                                How to use{' '}
                                <chakra.span fontStyle={'italic'}>
                                    {title}
                                </chakra.span>
                            </chakra.h1>
                            <chakra.p fontSize="sm" mt={2} color={'gray.200'}>
                                {helpText
                                    ? helpText
                                    : `Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Odio eligendi similique
                                exercitationem optio libero vitae accusamus
                                cupiditate laborum eos.`}
                            </chakra.p>
                            <chakra.p fontSize="sm" mt={2} color={'gray.200'}>
                                to close, click any
                                <chakra.span fontSize="sm" color={'white'}>
                                    <PopoverTrigger>
                                        <FiInfo></FiInfo>
                                    </PopoverTrigger>{' '}
                                </chakra.span>
                                <chakra.span>icon</chakra.span>
                            </chakra.p>
                        </Box>
                    </Box>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}
