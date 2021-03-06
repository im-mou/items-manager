import { IItem } from '../../types/types';
import { FaceIcon, Typography } from '../design-system';
import './item-card.sass';

export interface ItemCardDetailedProps {
    item: IItem;
}

const ItemCardDetailed = ({ item }: ItemCardDetailedProps) => {
    return (
        <article className="item-card item-card--detailed">
            <div className="item-card__image">
                <img src={item.image} alt={item.title} />
            </div>
            <div className="item-card__content">
                <div className="item-card__title">
                    <Typography variant="h3">{item.title ? item.title : '-'}</Typography>
                </div>
                <div className="item-card__body">
                    <Typography variant="body">{item.description ? item.description : '-'}</Typography>
                </div>
                <div className="item-card__user">
                    <FaceIcon />
                    <Typography variant="caption">{item.email ? item.email : '-'}</Typography>
                </div>
                <div className="item-card__footers">
                    <Typography variant="h1" data-testid="item-card-price">
                        {item.price ? parseFloat(item.price).toLocaleString('es-ES') : '-'}€
                    </Typography>
                </div>
            </div>
        </article>
    );
};

export default ItemCardDetailed;
