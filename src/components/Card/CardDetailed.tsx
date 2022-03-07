import { IItem } from '../../types/types';
import { FaceIcon, Typography } from '../design-system';
import './card.sass';

export interface CardDetailedProps {
    item: IItem;
}

const CardDetailed = ({ item }: CardDetailedProps) => {
    return (
        <article className="item-card detailed">
            <div className="item-card__image">
                <img src={item.image} alt={item.title} />
            </div>
            <div className="item-card__content">
                <div className="item-card__content__title">
                    <Typography variant="h3">{item.title}</Typography>
                </div>
                <div className="item-card__content__body">
                    <Typography variant="body">{item.description}</Typography>
                </div>
                <div className="item-card__content__user">
                    <FaceIcon />
                    <Typography variant="caption">{item.email}</Typography>
                </div>
                <div className="item-card__content__footers">
                    <Typography variant="h1">{item.price}€</Typography>
                </div>
            </div>
        </article>
    );
};

export default CardDetailed;
