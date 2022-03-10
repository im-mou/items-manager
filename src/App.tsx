import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { Backdrop, Container, Typography } from './components/design-system';
import HomeView from './parts/HomeView';
import SearchView from './parts/SearchView';
import TopBar from './parts/TopBar';
import { useStore } from './store';

const App = observer(function App() {
    // Hooks
    const { RootStore } = useStore();

    // Local state
    const [isLoading, setIsLoading] = useState(true);

    // Stuff to run before mounting the app
    React.useEffect(() => {
        async function init() {
            // Initialize items store
            await RootStore.init();

            // fake delay
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        }

        //Exec. init
        init();
    }, []);

    // do not mount app until initial data is fetched from server
    if (isLoading) {
        return (
            <Backdrop>
                <Typography variant="body">Initializing App</Typography>
            </Backdrop>
        );
    }

    return (
        <Container>
            <TopBar />
            {RootStore.search.active ? (
                // Show search view if search is active
                <SearchView />
            ) : (
                // Show home view by default
                <HomeView />
            )}
        </Container>
    );
});

export default App;
