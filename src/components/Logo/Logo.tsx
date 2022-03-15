import ItemManagerIcon from '../design-system/Icons/ItemManagerIcon';
import { ReactComponent as FullLogo } from '../../asset/images/logo-full.svg';
import { Button } from '../design-system';
import './logo.sass';

const Logo = () => {
    return (
        <a href="/" className="logo">
            <FullLogo className="logo__desktop" />
            <Button
                aria-label="Items manager homepage"
                className="logo__mobile"
                variant="icon"
                icon={<ItemManagerIcon className="logo__mobile" />}
            />
        </a>
    );
};

export default Logo;
