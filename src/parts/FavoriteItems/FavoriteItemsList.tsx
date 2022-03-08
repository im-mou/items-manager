import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, DeleteIcon, FavoriteFilledIcon, Paper, theme, Typography } from '../../components/design-system';
import { useStore } from '../../store';
import './favorite-items.sass';

// component

// Main component
const FavoriteItemsList = observer(function FavoriteItemsList() {
    // Global state
    const { ItemsStore } = useStore();

    return (
        <div className="favorite-items">
            {ItemsStore.favouriteitemsList.length ? (
                <React.Fragment>
                    {/** info */}
                    <div className="favorite-items__info">
                        <Typography variant="caption">
                            {ItemsStore.favouriteitemsList.length} items added to list
                        </Typography>
                    </div>

                    {/** items list */}
                    <div className="favorite-items__list">
                        {ItemsStore.favouriteitemsList.map((item) => (
                            <Paper
                                tabIndex={0}
                                variant="outlined"
                                key={`${item.title}_${item.email}`}
                                className="favorite-items__list__item"
                            >
                                <div className="favorite-items__list__item__image">
                                    <img src={item.image} alt={item.title} />
                                </div>
                                <div className="favorite-items__list__item__title">
                                    <Typography variant="h3">{item.title}</Typography>
                                </div>
                                <div className="favorite-items__list__item__action">
                                    <Button
                                        tabIndex={0}
                                        variant="icon"
                                        aria-label="Delete favourite item"
                                        onClick={() => ItemsStore.removeItemfromFavourite(item._id)}
                                        icon={<DeleteIcon color={theme.palette.gray[500]} />}
                                    />
                                </div>
                            </Paper>
                        ))}
                    </div>
                </React.Fragment>
            ) : (
                // empty state
                <div className="favorite-items__empty-state">
                    <FavoriteFilledIcon />
                    <Typography variant="h2">No favourite items added!</Typography>
                    <Typography variant="body">Use the heart button to add items to your favourite list!</Typography>
                </div>
            )}
        </div>
    );
});

export default FavoriteItemsList;
