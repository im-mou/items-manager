import Button from './components/design-system/Button';
import { FavoriteFilledIcon } from './components/design-system/Icons';
import { Input, theme } from './components/design-system';
import Typography from './components/design-system/Typography';
import Paper from './components/design-system/Paper';

const App = () => {
    return (
        <div>
            <Button startIcon={<FavoriteFilledIcon color={theme.palette.primary.main} />}>Whishlist</Button>
            <Typography variant="h1">The quick brown fox jumps over the lazy dog</Typography>
            <Typography variant="h2">The quick brown fox jumps over the lazy dog</Typography>
            <Typography variant="h3">The quick brown fox jumps over the lazy dog</Typography>
            <Typography variant="h4">The quick brown fox jumps over the lazy dog</Typography>
            <Typography variant="body">The quick brown fox jumps over the lazy dog</Typography>
            <Paper variant='outlined' style={{ padding: 24, margin: 24 }}>djahsjdh</Paper>
            <Input value="Normal input" />
            <Input variant='naked' value="Naked input" />
        </div>
    );
};

export default App;
