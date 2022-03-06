import React from 'react';
import { Button, CloseIcon, EuroIcon, Input, Paper, SearchIcon, theme } from '../design-system';
import clsx from 'clsx';
import './searchbar.sass';

// Main component
const SearchBar = () => {
    // refs
    const priceInputRef = React.useRef<HTMLInputElement>(null);

    // Local state
    const [searchValue, setSearchValue] = React.useState('');
    const [priceValue, setPriceValue] = React.useState('');
    const [isInputActive, setIsInputActive] = React.useState<boolean>(false);
    const [isPriceInputActive, setIsPriceInputActive] = React.useState<boolean>(false);

    // Toggle search input focus
    const activateInput = (activate: boolean) => () => {
        // do not de-activate input if there is value present
        if (!activate && searchValue.length > 0) {
            return;
        }
        setIsInputActive(activate);
    };

    // Toggle price input focus
    const activatePriceInput = (activate: boolean) => () => {
        setIsPriceInputActive(activate);
        // reset price input
        setPriceValue('');

        // focus input on click
        if (activate) {
            setTimeout(() => {
                priceInputRef.current?.focus();
            }, 300);
        }
    };

    return (
        <div className="searchbar-wrapper">
            <Paper className={clsx('text-search', { ['text-search--active']: isInputActive })} variant="outlined">
                <div className="text-search__icon">
                    <SearchIcon color={theme.palette.gray[500]} />
                </div>
                <Input
                    max="10"
                    variant="naked"
                    placeholder="Search items..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={activateInput(true)}
                    onBlur={activateInput(false)}
                />
            </Paper>
            <Paper
                variant="outlined"
                className={clsx('price-search', { ['price-search--active']: isPriceInputActive })}
            >
                <div className="price-search__icon" onClick={activatePriceInput(true)}>
                    <EuroIcon color={isPriceInputActive ? theme.palette.primary.main : theme.palette.gray[500]} />
                </div>
                <div className="price-search__input">
                    <Input
                        ref={priceInputRef}
                        variant="naked"
                        placeholder="price..."
                        value={priceValue}
                        onChange={(e) => setPriceValue(e.target.value)}
                    />
                </div>
                <div className="price-search__close">
                    <Button
                        variant="icon"
                        onClick={activatePriceInput(false)}
                        icon={<CloseIcon style={{ height: 18, width: 18, fill: theme.palette.gray[500] }} />}
                    />
                </div>
            </Paper>
        </div>
    );
};

export default SearchBar;
