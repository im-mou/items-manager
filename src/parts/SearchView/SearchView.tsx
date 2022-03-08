import { observer } from 'mobx-react';
import React from 'react';
import { useStore } from '../../store';
import ItemsGrid from '../ItemsGrid';
import SearchViewHeader from './Header';

const SearchView = observer(function SearchView() {
    // Global state
    const { ItemsStore } = useStore();

    return (
        <React.Fragment>
            {/** Search view header */}
            <SearchViewHeader />

            {/** View containing list of homeview items or search items */}
            <ItemsGrid items={ItemsStore.searchitemsList} />
        </React.Fragment>
    );
});

export default SearchView;
