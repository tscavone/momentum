import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from '../reportWebVitals'
import { RootStoreProvider } from './components/RootStoreProvider'
import { ChakraProvider } from '@chakra-ui/react'
import { customTheme } from './theme/theme'
import { extendTheme } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SideMenuApp from './SideMenuApp'

const theme = extendTheme(customTheme)

ReactDOM.render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <RootStoreProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<App />} />
                        <Route path="side" element={<SideMenuApp />} />
                    </Routes>
                </BrowserRouter>
            </RootStoreProvider>
        </ChakraProvider>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
