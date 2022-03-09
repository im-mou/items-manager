import { observer } from 'mobx-react';
import React from 'react';
import { Typography } from '../../components/design-system';
import { useStore } from '../../store';
import ItemsGrid from '../ItemsGrid';
import OrderByFilter from '../../components/OrderByFilter';
import './searchview.sass';

const SearchView = observer(function SearchView() {
    // Global state
    const { ItemsStore } = useStore();

    // Apply filter upon mounting the view
    React.useEffect(() => {
        ItemsStore.applyOrderByFilter('search');
    }, []);

    return (
        <React.Fragment>
            {/** Search view header */}
            <div className="searchview-header">
                <div>
                    <Typography variant="h2" className="searchview-header__title">
                        Search Results
                    </Typography>
                    <Typography variant="h3" className="searchview-header__subtitle">
                        Founds {ItemsStore.searchitemsList.length} items
                    </Typography>
                </div>

                {/** Order BY Filter Button */}
                <OrderByFilter view="search" />
            </div>

            {/** View containing list of homeview items or search items */}
            <ItemsGrid items={ItemsStore.searchitemsList} />
        </React.Fragment>
    );
});

export default SearchView;
