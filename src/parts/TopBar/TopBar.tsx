import Logo from '../../components/Logo';
import SearchBar from '../../components/SearchBar';
import { Button, FavoriteFilledIcon, theme } from '../../components/design-system';
import FavoriteItemsDialog from '../FavoriteItemsDialog';
import './topbar.sass';

const TopBar = () => {
    return (
        <header className="topbar">
            {/** App Logotype */}
            <Logo />

            {/** Searchbar component */}
            <SearchBar />

            {/** Whishlist Button for Desktop or Mobile */}
            <FavoriteItemsDialog>
                <span>
                    {/** Text button */}
                    <Button
                        className="topbar__whishlist--desktop"
                        aria-label="Open favorite items list"
                        startIcon={<FavoriteFilledIcon color={theme.palette.primary.main} />}
                    >
                        Favorite
                    </Button>

                    {/** Icon button */}
                    <Button
                        className="topbar__whishlist--mobile"
                        variant="icon"
                        color="primary"
                        aria-label="Open favorite items list"
                        icon={<FavoriteFilledIcon color={theme.palette.primary.main} />}
                    />
                </span>
            </FavoriteItemsDialog>
        </header>
    );
};

export default TopBar;
