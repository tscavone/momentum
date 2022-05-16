import { Box } from '@chakra-ui/react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { Footer } from './components/Footer'
import Login from './components/Login'
import { MainContent } from './components/MainContent'
import { useAuthedUserStore } from './components/RootStoreProvider'
import { TopNav } from './components/TopNav'

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
                <TopNav>
                    <MainContent />
                </TopNav>
                <Footer />
            </Box>
        </div>
    )
})

export default App
