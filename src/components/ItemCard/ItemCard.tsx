import clsx from 'clsx';
import { observer } from 'mobx-react';
import { useStore } from '../../store';
import { IItem } from '../../types/types';
import { Button, FavoriteFilledIcon, FavoriteIcon, theme, Typography, UnfoldIcon } from '../design-system';
import './item-card.sass';

export interface ItemCardProps {
    item: IItem;
    openDetails?: () => void;
}

const ItemCard = observer(function ItemCard({ item, openDetails }: ItemCardProps) {
    const { ItemsStore } = useStore();

    // Check if item is added to favourite
    const isItemFavourite = ItemsStore.favouriteitemsList.findIndex((_item) => _item._id === item._id) !== -1;

    // add item to favourite lisr
    const toggleItemToFavourite = () => {
        // add to favourite list if it's not there, otherwise remove it from the list
        if (isItemFavourite === false) {
            ItemsStore.addItemToFavourite(item);
        } else {
            ItemsStore.removeItemfromFavourite(item._id);
        }
    };

    return (
        <article className="item-card">
            <div className="item-card__image" onClick={openDetails}>
                <img src={item.image} alt={item.title} />
            </div>
            <div className="item-card__content">
                <div className="item-card__content__title">
                    <Typography variant="h3">{item.title}</Typography>
                </div>
                <div className="item-card__content__user">
                    <Typography variant="caption">{item.email}</Typography>
                </div>
                <div className="item-card__content__body">
                    <Typography ellipsis={100} variant="body">
                        {item.description}
                    </Typography>
                </div>
                <div className="item-card__content__footers">
                    <Typography variant="h1">{item.price}€</Typography>
                    <div>
                        <Button
                            onClick={openDetails}
                            variant="icon"
                            icon={<UnfoldIcon color={theme.palette.gray[700]} />}
                        />
                        <Button
                            className={clsx({ ['item-card__content__footers__liked']: isItemFavourite })}
                            variant="icon"
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
