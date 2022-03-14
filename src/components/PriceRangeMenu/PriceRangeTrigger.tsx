import React from 'react';
import clsx from 'clsx';
import { Button, EuroIcon, Paper, theme, Typography } from '../design-system';
import './price-range-menu.sass';

interface PriceRangeTriggerProps {
    openMenu: () => void;
    isMenuOpen: boolean;
    isPriceInputActive: boolean;
    minPriceValue?: string;
    maxPriceValue?: string;
}

const PriceRangeTrigger = React.memo(function PriceRangeTrigger({
    openMenu,
    isMenuOpen,
    isPriceInputActive,
    minPriceValue,
    maxPriceValue,
}: PriceRangeTriggerProps) {
    return (
        <Paper
            aria-label="filter price"
            onClick={openMenu}
            variant="outlined"
            className={clsx('price-menu-trigger', { ['price-menu-trigger--active']: isPriceInputActive })}
        >
            {/** Show button + price value if it is present */}
            <Button
                aria-label="filter price button"
                variant="icon"
                className="price-menu-trigger__button"
                icon={<EuroIcon color={isPriceInputActive ? theme.palette.primary.main : theme.palette.gray[500]} />}
            />
            {/** - Show price value in the button, if the price filter is applied */}
            {isPriceInputActive && !isMenuOpen ? (
                <div className="price-menu-trigger__value" data-testid="price-range-trigger-value">
                    {minPriceValue && <Typography variant="h3">{minPriceValue}€</Typography>}
                    {maxPriceValue && (
                        <>
                            <Typography className="price-menu-trigger__separator" variant="h3">
                                –
                            </Typography>
                            <Typography variant="h3">{maxPriceValue}€</Typography>
                        </>
                    )}
                </div>
            ) : null}
        </Paper>
    );
});

export default PriceRangeTrigger;
