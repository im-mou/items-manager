import { createContext, useContext } from 'react';
import RootStore from './RootStore';

// Types and interfaces
type TStores = {
    RootStore: RootStore;
};

/**
 * Instantiation of stores
 */
const stores: TStores = {
    RootStore: new RootStore(),
};

/**
 * Store Context Provider
 *  */
const StoreContext = createContext<TStores>({} as TStores);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
    return <StoreContext.Provider value={{ ...stores } as TStores}>{children}</StoreContext.Provider>;
};

/**
 * Hook to use store in any functional component
 *  */
export const useStore = () => useContext(StoreContext);

export default stores;
