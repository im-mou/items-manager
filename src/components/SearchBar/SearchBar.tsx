import React from 'react';
import { Button, CloseIcon, EuroIcon, Input, Menu, Paper, SearchIcon, theme, Typography } from '../design-system';
import clsx from 'clsx';
import { observer } from 'mobx-react';
import { useStore } from '../../store';
import './searchbar.sass';
import PriceRangeMenu from '../PriceRangeMenu';
import { IFormInput } from '../../types/types';

// Main component
const SearchBar = observer(function SearchBar() {
    // Global state
    const { RootStore } = useStore();

    // refs
    const minPriceInputRef = React.useRef<HTMLInputElement>(null);

    // Local state
    const [searchInput, setSearchInput] = React.useState<IFormInput>({ value: '', error: false, errMsg: '' });
    const [isSearchInputActive, setIsSearchInputActive] = React.useState<boolean>(false);
    const [isPriceInputActive, setIsPriceInputActive] = React.useState<boolean>(false);

    // update search input value
    const searchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(prev => ({ ...prev, value: e.target.value }));
    };

    // Toggle search input focus to apply White background to it.
    const activateSearchInput = (activate: boolean) => () => {
        // do not de-activate input if there is value present
        if (!activate && searchInput.value.length > 0) {
            return;
        }
        setIsSearchInputActive(activate);
    };

    // Toggle price button to white to indicate that price filter has some value (apply white background).
    const activatePriceInput = (activate: boolean) => {
        setIsPriceInputActive(activate);
    };

    // Listen to enter key to trigger the submit query
    const onEnterKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (isPriceInputActive || searchInput.value.trim().length) {
                submitSearch();
            }
        }
    };

    // Submit search
    const submitSearch = () => {
        // dispatch search query action to store
        RootStore.searchItems({
            term: searchInput.value.trim().toLowerCase(),
            price: minPriceInputRef.current?.value,
        });
    };

    return (
        <div className="searchbar-wrapper">
            <Paper className={clsx('text-search', { ['text-search--active']: isSearchInputActive })} variant="outlined">
                {/**
                 * Search input left ICON / ACTION
                 * */}
                {RootStore.search.active === false ? (
                    // By default show search icon
                    <Button
                        aria-label="Search button"
                        variant="icon"
                        className="text-search__icon"
                        icon={<SearchIcon color={theme.palette.gray[500]} />}
                    />
                ) : (
                    // Button to close search if a search query is active
                    <Button
                        aria-label="Clear search button"
                        variant="icon"
                        className="text-search__icon"
                        onClick={() => RootStore.closeSearchView()}
                        icon={<CloseIcon color={theme.palette.primary.main} />}
                    />
                )}

                {/** Main Search input */}
                <Input
                    variant="naked"
                    className="text-search__input"
                    placeholder="Search items..."
                    value={searchInput.value}
                    onChange={searchInputHandler}
                    onFocus={activateSearchInput(true)}
                    onBlur={activateSearchInput(false)}
                    onKeyUp={onEnterKeyPress}
                />
            </Paper>

            {/** Price input */}
            <Menu
                trigger={(setOpen, isOpen) => (
                    <Paper
                        aria-label="filter price"
                        onClick={setOpen}
                        variant="outlined"
                        className={clsx('price-search', { ['price-search--active']: isPriceInputActive })}
                    >
                        {/** Show button + price value if it is present */}
                        <Button
                            aria-label="filter price button"
                            variant="icon"
                            className="price-search__icon"
                            icon={
                                <EuroIcon
                                    color={isPriceInputActive ? theme.palette.primary.main : theme.palette.gray[500]}
                                />
                            }
                        />
                        {/** - Show price value in the button, if the price filter is applied */}
                        {isPriceInputActive && !isOpen ? (
                            <Typography className="price-search__value" variant="h3">
                                {minPriceInputRef.current?.value}
                            </Typography>
                        ) : null}
                    </Paper>
                )}
            >
                {/** Price range Form */}
                <PriceRangeMenu
                    minPriceRef={minPriceInputRef}
                    isFormFilled={activatePriceInput}
                    onEnterKeyPress={onEnterKeyPress}
                />
            </Menu>
        </div>
    );
});

export default SearchBar;
