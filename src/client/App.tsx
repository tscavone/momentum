import { Box } from '@chakra-ui/react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { Footer } from './components/Footer'
import { InitEmployees } from './components/InitEmployees'
import { Login } from './components/Login'
import { MainContent } from './components/MainContent'
import {
    useAuthedUserStore,
    useEmployeeStore,
} from './components/RootStoreProvider'
import { TopNav } from './components/TopNav'

const DateState = observable({
    currentDate: null,
})

const App = observer(() => {
    const authedUserStore = useAuthedUserStore()
    const employeeStore = useEmployeeStore()

    if (authedUserStore.token === null || authedUserStore.userId === null) {
        return <Login />
    }

    if (employeeStore.numEmployees() === 0) {
        return <InitEmployees />
    }
    return (
        <div className="App">
            <Box>
                <TopNav>
                    <MainContent />
                </TopNav>
                <Footer />
            </Box>
        </div>
    )
})

export default App
