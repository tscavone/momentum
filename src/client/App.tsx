import { Box } from '@chakra-ui/react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { useState } from 'react'
import { Footer } from './components/Footer'
import Login from './components/Login'
import { MainContent } from './components/MainContent'
import { TopNav } from './components/TopNav'

const DateState = observable({
    currentDate: null,
})

const App = observer(() => {
    const [token, setToken] = useState()

    if (!token) {
        return <Login setToken={setToken} />
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
