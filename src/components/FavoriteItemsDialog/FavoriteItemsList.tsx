import { observer } from 'mobx-react-lite';
import React from 'react';
import {
    Button,
    DeleteIcon,
    FavoriteFilledIcon,
    FlagIcon,
    Input,
    Paper,
    SearchIcon,
    theme,
    Typography,
} from '../../components/design-system';
import { useStore } from '../../store';
import './favorite-items.sass';

// component

// Main component
const FavoriteItemsList = observer(function FavoriteItemsList() {
    // Global state
    const { RootStore } = useStore();

    // Local state
    const [localItemsList, setLocalItemsList] = React.useState(RootStore.favouriteitemsList); // keep a synced copy
    const [searchInputValue, setSearchInputValue] = React.useState('');

    // On mount
    React.useEffect(() => {
        // clear search input on mount
        setSearchInputValue('');
    }, []);

    // search input listener
    const onSearcInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;

        // set state
        setSearchInputValue(value);

        if (value.trim().length === 0) {
            // remove filter
            setLocalItemsList(RootStore.favouriteitemsList);

            return;
        }

        // filter
        setLocalItemsList(
            RootStore.favouriteitemsList.filter(
                item =>
                    // Might not be the fastest way to search
                    // I'm tired... sorry
                    item.title
                        .toLowerCase()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .indexOf(value) !== -1,
            ),
        );
    };

    // delete item
    const deleteItem = (id: string) => () => {
        // Delete from store
        RootStore.removeItemfromFavourite(id);

        // Update local state copy.
        // We have to do this in order to update the search results list (if search is active)
        setLocalItemsList(prev => prev.filter(item => item._id !== id));
    };

    return (
        <div className="favorite-items">
            {RootStore.favouriteitemsList.length ? (
                <React.Fragment>
                    {/** info */}
                    <div className="favorite-items__toolbar">
                        <Input
                            className="favorite-items__toolbar__search"
                            variant="naked"
                            startIcon={<SearchIcon color={theme.palette.primary.main} />}
                            placeholder="Seach your favourite items..."
                            value={searchInputValue}
                            onChange={onSearcInputChange}
                        />
                        <Typography variant="caption" className="favorite-items__toolbar__info">
                            {localItemsList.length} {searchInputValue.length ? 'items found' : 'items added to list'}
                        </Typography>
                    </div>

                    {/** items list */}
                    <div className="favorite-items__list">
                        {localItemsList.map(item => (
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
                                        onClick={deleteItem(item._id)}
                                        icon={<DeleteIcon color={theme.palette.gray[500]} />}
                                    />
                                </div>
                            </Paper>
                        ))}
                    </div>

                    {/** NO Results found State */}
                    {searchInputValue.length && localItemsList.length === 0 ? (
                        <div className="favorite-items__empty-state">
                            <FlagIcon />
                            <Typography variant="h2">No items found</Typography>
                            <Typography variant="body">Please try another search</Typography>
                        </div>
                    ) : null}
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
