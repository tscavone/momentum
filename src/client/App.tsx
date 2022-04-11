import { Box } from '@chakra-ui/react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { Footer } from './components/Footer'
import { MainContent } from './components/MainContent'
import { TopNav } from './components/TopNav'

const DateState = observable({
    currentDate: null,
})

const App = observer(() => {
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
