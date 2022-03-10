import { observer } from 'mobx-react';
import React from 'react';
import { Button, FlagIcon, Typography } from '../../components/design-system';
import { useStore } from '../../store';
import ItemsGrid from '../ItemsGrid';
import OrderByFilter from '../../components/OrderByFilter';
import usePagination from '../../hooks/usePagination';
import './searchview.sass';

const SearchView = observer(function SearchView() {
    // Global state
    const { RootStore } = useStore();

    // Pagination hook
    const {
        paginate,
        items: searchResults,
        isItLastPage,
        feedItems,
        orderBy: { sort: sortItems, state: orderByState },
    } = usePagination({ itemsPerPage: 6 });

    // Update pagination data
    React.useEffect(() => {
        // Get initial 'x' items
        paginate(RootStore.searchitemsList, orderByState);
    }, [RootStore.searchitemsList]);

    // fake loading delay upload loading more items
    const loadMoreItems = () => {
        // get more feed data
        feedItems();
    };

    return (
        <div className="searchview">
            {/** Search view header */}
            {RootStore.searchitemsList.length > 0 ? (
                <React.Fragment>
                    <div className="searchview-header">
                        <div>
                            <Typography variant="h2" className="searchview-header__title">
                                Search Results
                            </Typography>
                            <Typography variant="h3" className="searchview-header__subtitle">
                                Founds {RootStore.searchitemsList.length} items
                            </Typography>
                        </div>

                        {/** Order BY Filter Button */}
                        <OrderByFilter sort={sortItems} orderByState={orderByState} />
                    </div>

                    {/** View containing list of homeview items or search items */}
                    <ItemsGrid items={searchResults} />

                    {/** Show LOAD MORE button if the view is HOME VIEW */}
                    {isItLastPage === false && (
                        <div className="searchview__footer">
                            <Button onClick={loadMoreItems} variant="text">
                                Load more
                            </Button>
                        </div>
                    )}
                </React.Fragment>
            ) : (
                /** No results found state */
                <div className="searchview__empty-state">
                    <FlagIcon />
                    <Typography variant="h2">No items found</Typography>
                    <Typography variant="body">Please try another search</Typography>
                </div>
            )}
        </div>
    );
});

export default SearchView;
