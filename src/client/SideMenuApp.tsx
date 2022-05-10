import { Box } from '@chakra-ui/react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { Footer } from './components/Footer'
import Login from './components/Login'
import { MainContent } from './components/MainContent'
import { MainNav } from './components/MainNav'
import { useAuthedUserStore } from './components/RootStoreProvider'

const DateState = observable({
    currentDate: null,
})

const App = observer(() => {
    const authedUserStore = useAuthedUserStore()

    if (authedUserStore.token === null || authedUserStore.userId === null) {
        return <Login />
    }

    return (
        <div className="App">
            <Box>
                <MainNav>
                    <MainContent />
                </MainNav>
                <Footer />
            </Box>
        </div>
    )
})

export default App
