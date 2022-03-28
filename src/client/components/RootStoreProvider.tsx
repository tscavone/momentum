//
// converted from :
//  https://dev.to/ivandotv/mobx-root-store-pattern-with-react-hooks-318d
//

import * as React from 'react'
import { ReactNode } from 'react'
import { ITemporalStore } from '../stores/ITemporalStore'
import { RootStore } from '../stores/RootStore'
import { SelectedEmployeeStore } from '../stores/SelectedEmployeeStore'
import { SettingsStore } from '../stores/SettingsStore'
import { StretchAnswerStore } from '../stores/StretchAnswerStore'
import { EmployeeStore } from '../stores/EmployeeStore'

const StoreContext = React.createContext<RootStore | undefined>(undefined)

// create the provider component
export function RootStoreProvider({ children }: { children: ReactNode }) {
    const rootStore = new RootStore()
    rootStore.initialize()

    return (
        <StoreContext.Provider value={rootStore}>
            {children}
        </StoreContext.Provider>
    )
}

// TODO: figure out how to absract out initRootStore without react complaining
// function initRootStore(): RootStore {
//     const context = React.useContext(StoreContext)
//     if (context === undefined) {
//         throw new Error("useRootStore must be used within RootStoreProvider")
//     }

//     return context;
// }

export function useNoteStore(): ITemporalStore {
    const context = React.useContext(StoreContext)
    if (context === undefined) {
        throw new Error('context not initialized')
    }

    return context._noteStore
}

export function useEmployeeStore(): EmployeeStore {
    const context = React.useContext(StoreContext)
    if (context === undefined) {
        throw new Error('context not initialized')
    }

    return context._employeeStore
}

export function useSettingsStore(): SettingsStore {
    const context = React.useContext(StoreContext)
    if (context === undefined) {
        throw new Error('useRootStore must be used within RootStoreProvider')
    }

    return context._settingsStore
}

export function useSelectedEmployeeStore(): SelectedEmployeeStore {
    const context = React.useContext(StoreContext)
    if (context === undefined) {
        throw new Error('useRootStore must be used within RootStoreProvider')
    }

    return context._selectedEmployeeStore
}

export function useStretchAnswerStore(): StretchAnswerStore {
    const context = React.useContext(StoreContext)
    if (context === undefined) {
        throw new Error('useRootStore must be used within RootStoreProvider')
    }

    return context._stretchAnswerStore
}
