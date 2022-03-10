import { observer } from 'mobx-react';
import React from 'react';
import { Button, Loader } from '../../components/design-system';
import Hero from '../../components/Hero';
import OrderByFilter from '../../components/OrderByFilter';
import usePagination from '../../hooks/usePagination';
import { useStore } from '../../store';
import { IItem } from '../../types/types';
import ItemsGrid from '../ItemsGrid';
import './homeview.sass';

const HomeView = observer(function HomeView() {
    // Global state
    const { RootStore } = useStore();

    // Local state
    const [isLoading, setIsLoading] = React.useState(false);

    // Pagination hook
    const { paginate, items, isItLastPage, feedItems, currentOffset } = usePagination<IItem>({
        initialOffset: RootStore.homepageOffset,
    });

    // Update pagination data
    React.useEffect(() => {
        // Get initial 'x' items
        paginate(RootStore.sourceItemsList);
    }, [RootStore.sourceItemsList]);

    // fake loading delay upload loading more items
    const loadMoreItems = () => {
        setIsLoading(true);

        // delay
        setTimeout(() => {
            // get more feed data
            feedItems();

            // save current offset
            RootStore.setHomepageOffset(currentOffset);

            setIsLoading(false);
        }, 500);
    };

    return (
        <div className="homeview">
            {/** Home view headers */}
            <Hero />

            {/** Order BY Filter Button */}
            <div className="homeview__toolbar">
                <OrderByFilter view="home" />
            </div>

            {/** View containing list of homeview items */}
            <ItemsGrid items={items} />

            {/** Show LOAD MORE button if the view is HOME VIEW */}
            {isItLastPage === false && (
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
