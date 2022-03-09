import Logo from '../../components/Logo';
import SearchBar from '../../components/SearchBar';
import FavoriteItemsDialog from '../../components/FavoriteItemsDialog';
import './topbar.sass';

const TopBar = () => {
    return (
        <header className="topbar">
            {/** App Logotype */}
            <Logo />

            {/** Searchbar component */}
            <SearchBar />

            {/** Whishlist Button + dialog */}
            <FavoriteItemsDialog />
        </header>
    );
};

export default TopBar;
