import { ChakraProvider, Menu, MenuList } from '@chakra-ui/react'
import { SettingsMenuItem } from '../client/components/SettingsMenuItem'
import { SettingsStore } from '../client/stores/SettingsStore'
import { customTheme } from '../client/theme/theme'
import { extendTheme } from '@chakra-ui/react'
import { configure, mount } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { IDataSettings } from '../client/data_definitions/SettingsDefinitions'
configure({ adapter: new Adapter() })

const theme = extendTheme({ customTheme })
// 2. Add your color mode config
const config = {
    initialColorMode: 'light',
    useSystemColorMode: true,
}

//test data
const settingsTestData: IDataSettings = {
    entries: [
        {
            _id: '1100',
            _name: 'persistence',
            _description:
                'what type of persistence would you like to use [local/browser, server]',
            _potentialValues: ['test', 'local', 'server'],
            _type: 'select',
        },
        {
            _id: '1200',
            _name: 'positions',
            _description: 'employment-levels for software engineers',
            _type: 'multiple',
        },
        {
            _id: '1300',
            _name: 'stretch questions',
            _description: 'questions to ask to get to know your reports better',
            _type: 'multiple',
        },
    ],
    values: {
        abcdef: [
            {
                _entryId: '1100',
                _id: '1100-10',
                _value: 'test',
            },
            {
                _entryId: '1200',
                _id: '1200-10',
                _value: 'Associate Software Engineer',
                _description:
                    'Somebody just starting out. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
            },
            {
                _entryId: '1200',
                _id: '1200-20',
                _value: 'Software Engineer',
                _description:
                    'Somebody who has been at it for a while. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
            },
            {
                _entryId: '1200',
                _id: '1200-30',
                _value: 'Senior Software Engineer',
                _description:
                    'Should be well versed in a lot of stuff and a good programmer.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            },
            {
                _entryId: '1300',
                _id: '1300-10',
                _value: "How do you debug a problem when you're really stuck?",
            },
            {
                _entryId: '1300',
                _id: '1300-20',
                _value: 'What initially got you into coding?',
            },
            {
                _entryId: '1300',
                _id: '1300-30',
                _value: 'Have you ever eaten Vegemite?',
            },
            {
                _entryId: '1300',
                _id: '32132148378945231894732',
                _value: 'This is a deleted question',
                _deleted: 'true',
            },
        ],
    },
}

it('renders correctly', () => {
    let settingsStore = new SettingsStore()
    settingsStore.load({
        entries: settingsTestData['entries'],
        values: settingsTestData['values']['abcdef'],
    })

    const wrapper = mount(
        <ChakraProvider theme={theme}>
            <Menu>
                <MenuList>
                    <SettingsMenuItem settings={settingsStore.settings} />
                </MenuList>
            </Menu>
        </ChakraProvider>
    )

    wrapper.find('button').simulate('click')
    // wrapper.find('button').click()
})
