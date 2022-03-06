import Logo from '../../components/Logo';
import SearchBar from '../../components/SearchBar';
import { Button, FavoriteFilledIcon, theme } from '../../components/design-system';
import './topbar.sass';
import Dialog from '../../components/design-system/Dialog';

const TopBar = () => {
    return (
        <header className="topbar">
            {/** App Logotype */}
            <Logo />

            {/** Searchbar component */}
            <SearchBar />

            {/** Whishlist Button for Desktop or Mobile */}
            <div className="topbar__whishlist--desktop">
                <Dialog
                    title="My favorite items"
                    trigger={() => (
                        <Button startIcon={<FavoriteFilledIcon color={theme.palette.primary.main} />}>Favorites</Button>
                    )}
                >
                    Menuuuuu
                </Dialog>
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
