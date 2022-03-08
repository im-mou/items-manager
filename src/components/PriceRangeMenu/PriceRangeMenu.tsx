import React from 'react';
import { IPriceRangeForm } from '../../types/types';
import { PRICE_MAX_VALUE, PRICE_MIN_VALUE } from '../../utils/constants';
import helpers from '../../utils/helpers';
import { Input, Typography } from '../design-system';
import './price-range-menu.sass';

interface PriceRangeMenuProps {
    isFormFilled: (filled: boolean) => void;
    minPriceRef: React.RefObject<HTMLInputElement>;
    maxPriceRef: React.RefObject<HTMLInputElement>;
}

/**
 *
 * For a futur version, I would add in input range -> min - max
 *
 */

const PriceRangeMenu = React.memo(function PriceRangeMenu({
    // This method is used to tell the parent component to activate an indicator that price filter is being used
    isFormFilled,
    minPriceRef,
}: PriceRangeMenuProps) {
    // Local state
    const [priceInput, setPriceInput] = React.useState<IPriceRangeForm>({
        value: '',
        error: false,
        errMsg: '',
    });

    // Listen for changes inthe input values to take furthur actions
    React.useEffect(() => {
        // This validation code will run after each input value update
        simplePriceValidation();

        // Indicate to the parent component that price form has some valid value
        // and can be used for the query.
        if (priceInput.error === false && priceInput.value.length > 0) {
            isFormFilled(true);
        } else {
            isFormFilled(false);
        }
    }, [priceInput]);

    // price inputs onChange handler
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Update input values
        setPriceInput((prev) => ({ ...prev, value: e.target.value }));
    };

    // Simple input price validation
    const simplePriceValidation = () => {
        if (priceInput.value.trim().length > 0) {
            // only allow numbers and value should be between valid price bounds
            if (!helpers.validatePriceValue(priceInput.value.trim(), PRICE_MIN_VALUE, PRICE_MAX_VALUE)) {
                priceInput.error = true;
                priceInput.errMsg = 'Please input a valid value';
            }
        } else {
            // when input is empty, there should be no error
            priceInput.error = false;

            // make sure that that all inputs are error free before removing the error message
            if (priceInput.error === false) {
                priceInput.errMsg = '';
            }
        }
    };

    return (
        <div className="price-range-menu">
            <Typography variant="h4">Filter by price</Typography>
            <Typography variant="caption">Input a price</Typography>
            <div className="price-range-menu__form">
                <Input
                    ref={minPriceRef}
                    value={priceInput.value}
                    error={priceInput.error}
                    onChange={onChange}
                    placeholder="Price..."
                    className="price-range-menu__form__input"
                />
            </div>
            {/** Error message indicator */}
            {priceInput.error ? (
                <Typography variant="caption" className="price-range-menu__error-message">
                    {priceInput.errMsg}
                </Typography>
            ) : null}
        </div>
    );
});

export default PriceRangeMenu;
