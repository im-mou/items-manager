import { observer } from 'mobx-react';
import React from 'react';
import { Button, Loader } from '../../components/design-system';
import Hero from '../../components/Hero';
import { useStore } from '../../store';
import ItemsGrid from '../ItemsGrid';
import './homeview.sass';

const HomeView = observer(function HomeView() {
    // Global state
    const { ItemsStore } = useStore();

    // Local state
    const [isLoading, setIsLoading] = React.useState(false);

    // fake loading delay
    const loadMoreItems = React.useCallback(() => {
        setIsLoading(true);

        // delay
        setTimeout(() => {
            // get more feed
            ItemsStore.feedItems();
            setIsLoading(false);
        }, 500);
    }, []);

    return (
        <div className="homeview">
            {/** Home view headers */}
            <Hero />

            {/** View containing list of homeview items */}
            <ItemsGrid items={ItemsStore.homePageitemsList} />

            {/** Show LOAD MORE button if the view is HOME VIEW */}
            {ItemsStore.pagination.lastPage === false && (
                <div className="homeview__footer">
                    <Button
                        disabled={isLoading}
                        endIcon={isLoading && <Loader />}
                        onClick={loadMoreItems}
                        variant="text"
                    >
                        Load more
                    </Button>
                </div>
            )}
        </div>
    );
});

export default HomeView;
