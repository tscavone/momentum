import { Box } from '@chakra-ui/react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { Footer } from './client/components/Footer'
import { MainContent } from './client/components/MainContent'
import { TabContainer } from './client/components/TabContainer'
import { TopNav } from './client/components/TopNav'

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
