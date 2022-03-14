import clsx from 'clsx';
import { observer } from 'mobx-react';
import { useStore } from '../../store';
import { IItem } from '../../types/types';
import { Button, ExpandMoreIcon, FavoriteFilledIcon, FavoriteIcon, theme, Typography } from '../design-system';
import './item-card.sass';

export interface ItemCardProps {
    item: IItem;
    openDetails?: () => void;
}

const ItemCard = observer(function ItemCard({ item, openDetails }: ItemCardProps) {
    const { RootStore } = useStore();

    // Check if item is added to favourite
    const isItemFavourite = RootStore.favouriteitemsList.findIndex(_item => _item._id === item._id) !== -1;

    // add item to favourite lisr
    const toggleItemToFavourite = () => {
        // add to favourite list if it's not there, otherwise remove it from the list
        if (isItemFavourite === false) {
            RootStore.addItemToFavourite(item);
        } else {
            RootStore.removeItemfromFavourite(item._id);
        }
    };

    return (
        <article className="item-card">
            <div className="item-card__image" onClick={openDetails}>
                <img src={item.image} alt={item.title} />
            </div>
            <div className="item-card__content">
                <div className="item-card__title">
                    <Typography variant="h3">{item.title ? item.title : '-'}</Typography>
                </div>
                <div className="item-card__user">
                    <Typography variant="caption">{item.email ? item.email : ' '}</Typography>
                </div>
                <div className="item-card__body">
                    <Typography ellipsis={100} variant="body">
                        {item.description ? item.description : '-'}
                    </Typography>
                </div>
                <div className="item-card__footers">
                    <Typography variant="h1" data-testid="item-card-price">
                        {item.price ? parseFloat(item.price).toLocaleString('es-ES') : '-'}€
                    </Typography>
                    <div>
                        <Button
                            data-testid="item-card-expand-button"
                            aria-label="View item Details"
                            onClick={openDetails}
                            variant="icon"
                            icon={<ExpandMoreIcon color={theme.palette.gray[700]} />}
                        />
                        <Button
                            data-testid="item-card-favourite-button"
                            aria-label="Add item to favourite list"
                            variant="icon"
                            className={clsx({ ['item-card__liked-button']: isItemFavourite })}
                            onClick={toggleItemToFavourite}
                            icon={
                                isItemFavourite ? (
                                    <FavoriteFilledIcon color={theme.palette.primary.main} />
                                ) : (
                                    <FavoriteIcon color={theme.palette.gray[700]} />
                                )
                            }
                        />
                    </div>
                </div>
            </div>
        </article>
    );
});

export default ItemCard;
