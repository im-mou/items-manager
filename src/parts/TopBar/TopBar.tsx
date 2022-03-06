import './topbar.sass';
import Logo from '../../components/Logo';
import SearchBar from '../../components/SearchBar';
import { Button, FavoriteFilledIcon, theme } from '../../components/design-system';

const TopBar = () => {
    return (
        <header className="topbar">
            {/** App Logotype */}
            <Logo />

            {/** Searchbar component */}
            <SearchBar />

            {/** Whishlist Button for Desktop or Mobile */}
            <div className="topbar__whishlist--desktop">
                <Button startIcon={<FavoriteFilledIcon color={theme.palette.primary.main} />}>Whishlist</Button>
            </div>
            <div className="topbar__whishlist--mobile">
                <Button
                    variant="icon"
                    color="primary"
                    icon={<FavoriteFilledIcon color={theme.palette.primary.main} />}
                />
            </div>
        </header>
    );
};

export default TopBar;
