import Logo from '../../components/Logo';
import SearchBar from '../../components/SearchBar';
import FavoriteItemsDialog from '../../components/FavoriteItemsDialog';
import { observer } from 'mobx-react';
import { useStore } from '../../store';
import './topbar.sass';

const TopBar = observer(function TopBar() {
    // Global state
    const { RootStore } = useStore();

    return (
        <header className="topbar">
            {/** App Logotype */}
            <Logo />

            {/** Searchbar component */}
            <SearchBar
                isSearchActive={RootStore.search.active}
                submitSearch={query => RootStore.searchItems(query)}
                clearSearch={() => RootStore.closeSearchView()}
            />

            {/** Whishlist Button + dialog */}
            <FavoriteItemsDialog itemsCount={RootStore.favouriteitemsList.length} />
        </header>
    );
});

export default TopBar;
