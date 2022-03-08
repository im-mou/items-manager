import Logo from '../../components/Logo';
import SearchBar from '../../components/SearchBar';
import FavoriteItems from '../FavoriteItems';
import './topbar.sass';

const TopBar = () => {
    return (
        <header className="topbar">
            {/** App Logotype */}
            <Logo />

            {/** Searchbar component */}
            <SearchBar />

            {/** Whishlist Button + dialog */}
            <FavoriteItems />
        </header>
    );
};

export default TopBar;
