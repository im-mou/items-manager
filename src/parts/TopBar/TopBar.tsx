import Logo from '../../components/Logo';
import SearchBar from '../../components/SearchBar';
import FavoriteItemsDialog from '../../components/FavoriteItemsDialog';
import './topbar.sass';
import { observer } from 'mobx-react';
import { useStore } from '../../store';

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
            <FavoriteItemsDialog />
        </header>
    );
});

export default TopBar;
