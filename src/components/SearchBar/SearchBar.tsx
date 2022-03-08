import React from 'react';
import { Button, CloseIcon, EuroIcon, Input, Menu, Paper, SearchIcon, theme } from '../design-system';
import clsx from 'clsx';
import { observer } from 'mobx-react';
import { useStore } from '../../store';
import './searchbar.sass';
import PriceRangeMenu from '../PriceRangeMenu';

// Main component
const SearchBar = observer(function SearchBar() {
    // Global state
    const { ItemsStore } = useStore();

    // refs
    const minPriceInputRef = React.useRef<HTMLInputElement>(null);
    const maxPriceInputRef = React.useRef<HTMLInputElement>(null);

    // Local state
    const [searchInput, setSearchInput] = React.useState({
        value: '',
        error: false,
        errMsg: '',
    });

    const [isInputActive, setIsInputActive] = React.useState<boolean>(false);
    const [isPriceInputActive, setIsPriceInputActive] = React.useState<boolean>(false);

    // update search input value
    const searchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput((prev) => ({ ...prev, value: e.target.value }));
    };

    // Toggle search input focus
    const activateInput = (activate: boolean) => () => {
        // do not de-activate input if there is value present
        if (!activate && searchInput.value.length > 0) {
            return;
        }
        setIsInputActive(activate);
    };

    // Toggle price button to white to indicate that price filter has some value
    const activatePriceInput = (activate: boolean) => {
        setIsPriceInputActive(activate);
    };

    // Listen to enter key to trigger the submit query
    const enterKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            submitSearch();
        }
    };

    // Submit search
    const submitSearch = () => {
        ItemsStore.setSearchQuery({
            active: true,
            term: 'kajsdksahd',
            price: [null, null],
        });
    };

    return (
        <div className="searchbar-wrapper">
            <Paper className={clsx('text-search', { ['text-search--active']: isInputActive })} variant="outlined">
                {/**
                 * Search input left ICON / ACTION
                 * */}
                {ItemsStore.search.active === false ? (
                    // By default show search icon
                    <Button
                        variant="icon"
                        className="text-search__icon"
                        icon={<SearchIcon color={theme.palette.gray[500]} />}
                    />
                ) : (
                    // Button to close search if a search query is active
                    <Button
                        variant="icon"
                        className="text-search__icon"
                        onClick={() => ItemsStore.closeSearchView()}
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
                    onFocus={activateInput(true)}
                    onBlur={activateInput(false)}
                    onKeyUp={enterKeyPress}
                />
            </Paper>

            {/** Price input */}
            <Paper
                variant="outlined"
                className={clsx('price-search', { ['price-search--active']: isPriceInputActive })}
            >
                <Menu
                    trigger={(setOpen) => (
                        <Button
                            onClick={setOpen}
                            variant="icon"
                            className="price-search__icon"
                            icon={
                                <EuroIcon
                                    color={isPriceInputActive ? theme.palette.primary.main : theme.palette.gray[500]}
                                />
                            }
                        />
                    )}
                >
                    {/** Proce range form */}
                    <PriceRangeMenu
                        minPriceRef={minPriceInputRef}
                        maxPriceRef={maxPriceInputRef}
                        isFormFilled={activatePriceInput}
                    />
                </Menu>
            </Paper>
        </div>
    );
});

export default SearchBar;
