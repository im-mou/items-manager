import React from 'react';
import { Button, CloseIcon, EuroIcon, Input, Paper, SearchIcon, theme } from '../design-system';
import clsx from 'clsx';
import './searchbar.sass';

const SearchBar = () => {
    const [searchValue, setSearchValue] = React.useState('');
    const [isInputActive, setIsInputActive] = React.useState<boolean>(false);
    const [isPriceInputActive, setIsPriceInputActive] = React.useState<boolean>(false);

    const activateInput = (activate: boolean) => () => {
        // do not deactivate input if there is value present
        if (!activate && searchValue.length > 0) {
            return;
        }
        setIsInputActive(activate);
    };

    const activatePriceInput = (activate: boolean) => () => {
        setIsPriceInputActive(activate);
    };

    return (
        <div className="searchbar">
            <Paper
                className={clsx('searchbar__wrapper', { ['searchbar__wrapper--active']: isInputActive })}
                variant="outlined"
            >
                <div className="searchbar__wrapper__icon">
                    <SearchIcon color={theme.palette.gray[500]} />
                </div>
                <Input
                    variant="naked"
                    placeholder="Search items..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={activateInput(true)}
                    onBlur={activateInput(false)}
                />
            </Paper>
            <Paper variant="outlined" className={clsx('price', { ['price--active']: isPriceInputActive })}>
                <div className="price__icon" onClick={activatePriceInput(true)}>
                    <EuroIcon color={isPriceInputActive ? theme.palette.primary.main : theme.palette.gray[500]} />
                </div>
                <div className="price__input">
                    <Input type="number" variant="naked" placeholder="price..." />
                </div>
                <div className="price__close">
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
