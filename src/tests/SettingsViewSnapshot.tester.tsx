import { ChakraProvider, Menu, MenuList } from '@chakra-ui/react'
import renderer from 'react-test-renderer'
import { SettingsMenuItem } from '../client/components/SettingsMenuItem'
import { SettingsStore } from '../client/stores/SettingsStore'
import { settingsTestData } from './testdata'
import { customTheme } from '../client/theme/theme'
import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({ customTheme })
// 2. Add your color mode config
const config = {
    initialColorMode: 'light',
    useSystemColorMode: true,
}

// it('renders correctly', () => {
//     let settingsStore = new SettingsStore()
//     settingsStore.load({
//         entries: settingsTestData['entries'],
//         values: settingsTestData['values']['abcdef'],
//     })

//     const menuItemComponent = renderer.create(
//         <ChakraProvider theme={theme}>
//             <Menu>
//                 <MenuList>
//                     <SettingsMenuItem origSettings={settingsStore.settings} />
//                 </MenuList>
//             </Menu>
//         </ChakraProvider>
//     )

//     expect(menuItemComponent).toMatchSnapshot()
// })
