import { observer } from 'mobx-react';
import React from 'react';
import HomeView from '../parts/HomeView';
import SearchView from '../parts/SearchView';
import { useStore } from '../store';

// Very rudimentary router.
const Router = observer(function Router() {
    // GLobal Store
    const { RootStore } = useStore();
    return (
        <React.Fragment>
            {RootStore.search.active ? (
                // Show search view if search is active
                <SearchView />
            ) : (
                // Show home view by default
                <HomeView />
            )}
        </React.Fragment>
    );
});

export default Router;
