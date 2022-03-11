//
// converted from :
//  https://dev.to/ivandotv/mobx-root-store-pattern-with-react-hooks-318d
//

import * as React from "react";
import { ReactNode } from "react";
import { ITemporalStore } from "../stores/ITemporalStore";
import { RootStore } from "../stores/RootStore";

const StoreContext = React.createContext<RootStore | undefined>(undefined);

// create the provider component
export function RootStoreProvider({ children }: { children: ReactNode }) {
  
    const rootStore = new RootStore()
    rootStore.initialize();
  
    return <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
}
  
// create the hook
export function useNoteStore(): ITemporalStore{
    const context = React.useContext(StoreContext)
    if (context === undefined) {
        throw new Error("useRootStore must be used within RootStoreProvider")
    }

    return context._noteStore;
}


