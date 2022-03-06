import { theme, Typography } from '../design-system';
import ItemManagerIcon from '../design-system/Icons/ItemManagerIcon';
import './logo.sass';

const Logo = () => {
    return (
        <a href="/" className="logo">
            <ItemManagerIcon style={{ marginRight: theme.spacing(3) }} color={theme.palette.primary.main} />
            <Typography className="logo__name" variant="h3">
                Items <span className="logo__name--dimmed">Manager</span>
            </Typography>
        </a>
    );
};

export default Logo;
