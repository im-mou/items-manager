import React, { useRef } from 'react';
import { Button, CloseIcon, Input, Menu, Paper, SearchIcon, theme } from '../design-system';
import clsx from 'clsx';
import { PriceRangeMenu, PriceRangeTrigger } from '../PriceRangeMenu';
import { IFormInput, ISearchQuery } from '../../types/types';
import helpers from '../../utils/helpers';
import './searchbar.sass';

// Interfaces
interface SearchBarProps {
    isSearchActive: boolean;
    submitSearch: (searchQuery: Omit<ISearchQuery, 'active'>) => void;
    clearSearch: () => void;
}

// Main component
const SearchBar = (props: SearchBarProps) => {
    // Props
    const { isSearchActive, submitSearch, clearSearch } = props;

    // refs
    const minPriceInputRef = useRef<HTMLInputElement>(null);
    const maxPriceInputRef = useRef<HTMLInputElement>(null);

    // Local state
    const [searchInput, setSearchInput] = React.useState<IFormInput>({ value: '', error: false, errMsg: '' });
    const [isSearchInputActive, setIsSearchInputActive] = React.useState<boolean>(false);
    const [isPriceInputActive, setIsPriceInputActive] = React.useState<boolean>(false);

    // update search input value
    const searchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(prev => ({ ...prev, value: e.target.value }));

        // set input active state if the input has value
        setIsSearchInputActive(e.target.value.length > 0);
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
            submitSearchHandler();
        }
    };

    // Submit search
    const submitSearchHandler = () => {
        if (isPriceInputActive || searchInput.value.trim().length) {
            // dispatch search query action to store
            submitSearch({
                term: helpers.nomalizeSearchString(searchInput.value),
                price: {
                    min: minPriceInputRef.current ? minPriceInputRef.current.value : '',
                    max: maxPriceInputRef.current ? maxPriceInputRef.current.value : '',
                },
            });
        }
    };

    // function to clear search and go back to main page
    const clearSearchHandler = () => {
        clearSearch();
    };

    return (
        <div className="searchbar-wrapper">
            <Paper className={clsx('text-search', { ['text-search--active']: isSearchInputActive })} variant="outlined">
                {/**
                 * Search input left ICON / ACTION
                 * */}
                {isSearchActive === false ? (
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
                        data-testid="clear-search"
                        aria-label="Clear search button"
                        variant="icon"
                        className="text-search__icon"
                        onClick={clearSearchHandler}
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

            {/** Price input Menu */}
            <Menu
                trigger={(setOpen, isOpen) => (
                    /** Price input Trigger button */
                    <PriceRangeTrigger
                        isMenuOpen={isOpen}
                        openMenu={setOpen}
                        isPriceInputActive={isPriceInputActive}
                        minPriceValue={minPriceInputRef.current?.value}
                        maxPriceValue={maxPriceInputRef.current?.value}
                    />
                )}
            >
                {/** Price range Form */}
                <PriceRangeMenu
                    data-testid="price-range-menu"
                    minPriceRef={minPriceInputRef}
                    maxPriceRef={maxPriceInputRef}
                    setIsFormFilled={activatePriceInput}
                    submitSearch={submitSearchHandler}
                />
            </Menu>
        </div>
    );
};

export default SearchBar;
