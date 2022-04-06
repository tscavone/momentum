import React from 'react'
import { render, screen } from '@testing-library/react'
import App from '../App'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { RootStoreProvider } from '../client/components/RootStoreProvider'
import { customTheme } from '../client/theme/theme'

const theme = extendTheme(customTheme)
test('renders learn react link', () => {
    render(
        <React.StrictMode>
            <ChakraProvider theme={theme}>
                <RootStoreProvider>
                    <App />
                </RootStoreProvider>
            </ChakraProvider>
        </React.StrictMode>
    )
    const titleElement = screen.getByText(/Momentum/i)
    expect(titleElement).toBeInTheDocument()
})
