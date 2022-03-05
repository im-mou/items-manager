import Button from './components/design-system/Button';
import { FavoriteFilledIcon } from './components/design-system/Icons';
import { theme } from './components/design-system';

const App = () => {
    return (
        <div>
            <Button startIcon={<FavoriteFilledIcon color={theme.palette.primary.main} />}>Whishlist</Button>
        </div>
    );
};

export default App;
