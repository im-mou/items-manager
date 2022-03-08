import { ItemManagerIcon, Typography } from '../design-system';
import './hero.sass';

const Hero = () => {
    return (
        <div className="hero">
            <Typography variant="h2" className="hero__title">
                Welcome to ItemManager
            </Typography>
            <Typography variant="h3" className="hero__subtitle">
                Find anything you want, sell what you don’t need.
            </Typography>
            <ItemManagerIcon className="hero__icon" />
        </div>
    );
};

export default Hero;
