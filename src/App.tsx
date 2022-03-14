import React, { useState } from 'react';
import { Backdrop, Container, Typography } from './components/design-system';
import TopBar from './parts/TopBar';
import Router from './Router';
import stores, { StoreProvider } from './store';

const App = () => {
    // Local state
    const [isLoading, setIsLoading] = useState(true);

    // Stuff to run before mounting the app
    React.useEffect(() => {
        async function init() {
            // Initialize items store
            await stores.RootStore.init();

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
        <StoreProvider>
            <Container>
                <TopBar />
                {/**
                 * Simple Router to switch between:
                 * - homepage
                 * - search page
                 * */}
                <Router />
            </Container>
        </StoreProvider>
    );
};

export default App;
