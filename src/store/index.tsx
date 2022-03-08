import { createContext, useContext } from 'react';
import ItemsStore from './ItemsStore';

// Types and interfaces
type TStores = {
    ItemsStore: ItemsStore;
};

/**
 * Instantiation of stores
 */
const stores: TStores = {
    ItemsStore: new ItemsStore(),
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
