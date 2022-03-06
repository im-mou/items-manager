import { IItem } from '../../types/types';
import { Button, FavoriteIcon, theme, Typography } from '../design-system';
import './card.sass';

const Card = ({ item }: { item: IItem }) => {
    return (
        <article className="item-card">
            <div className="item-card__image">
                <img src={item.image} alt={item.title} />
            </div>
            <div className="item-card__content">
                <div className="item-card__content__title">
                    <Typography variant="h3">{item.title}</Typography>
                </div>
                <div className="item-card__content__body">
                    <Typography ellipsis={100} variant="body">
                        {item.description}
                    </Typography>
                </div>
                <div className="item-card__content__footers">
                    <Typography variant="h1">{item.price}€</Typography>
                    <Button variant="icon" icon={<FavoriteIcon color={theme.palette.gray[700]} />} />
                </div>
            </div>
        </article>
    );
};

export default Card;
