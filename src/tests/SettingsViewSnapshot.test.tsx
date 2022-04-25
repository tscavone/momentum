import { ChakraProvider, Menu, MenuList } from '@chakra-ui/react'
import { SettingsMenuItem } from '../client/components/SettingsMenuItem'
import { SettingsStore } from '../client/stores/SettingsStore'
import { settingsTestData } from './testdata'
import { customTheme } from '../client/theme/theme'
import { extendTheme } from '@chakra-ui/react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'

const theme = extendTheme({ customTheme })
// 2. Add your color mode config
const config = {
    initialColorMode: 'light',
    useSystemColorMode: true,
}

it('renders correctly', () => {
    let settingsStore = new SettingsStore()
    settingsStore.load({
        entries: settingsTestData['entries'],
        values: settingsTestData['values']['abcdef'],
    })

    const div = document.createElement('div')
    ReactDOM.render(
        <ChakraProvider theme={theme}>
            <Menu>
                <MenuList>
                    <SettingsMenuItem settings={settingsStore.settings} />
                </MenuList>
            </Menu>
        </ChakraProvider>,
        div
    )

    const wrapper = shallow(
        <ChakraProvider theme={theme}>
            <Menu>
                <MenuList>
                    <SettingsMenuItem settings={settingsStore.settings} />
                </MenuList>
            </Menu>
        </ChakraProvider>
    )
    wrapper.find('button').click()
})
