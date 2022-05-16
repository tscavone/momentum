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

const theme = extendTheme({
    ...customTheme,
    shadows: {
        outline: '0 0 0 3px #55804C',
    },
    components: {
        Form: {
            variants: {
                floating500: {
                    container: {
                        label: {
                            top: 0,
                            left: 0,
                            zIndex: 2,
                            position: 'absolute',
                            backgroundColor: 'green.500',
                            pointerEvents: 'none',
                            mx: 3,
                            px: 1,
                            my: 2,
                            transform: 'scale(0.85) translateY(-24px)',
                        },
                    },
                },
                floating: {
                    container: {
                        label: {
                            top: 0,
                            left: 0,
                            zIndex: 2,
                            position: 'absolute',
                            backgroundColor: 'white',
                            pointerEvents: 'none',
                            mx: 3,
                            px: 1,
                            my: 2,
                            transform: 'scale(0.85) translateY(-24px)',
                        },
                    },
                },
            },
        },
    },
})
theme.shadows.outline = 'green'
ReactDOM.render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <RootStoreProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="top" element={<App />} />
                        <Route path="/" element={<SideMenuApp />} />
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
