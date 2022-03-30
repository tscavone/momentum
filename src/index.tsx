import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { RootStoreProvider } from './client/components/RootStoreProvider'
import { ChakraProvider } from '@chakra-ui/react'
import { customTheme } from './client/theme/theme'
import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme(customTheme)

ReactDOM.render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <RootStoreProvider>
                <App />
            </RootStoreProvider>
        </ChakraProvider>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
