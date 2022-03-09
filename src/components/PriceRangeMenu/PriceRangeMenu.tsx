import React from 'react';
import { IFormInput } from '../../types/types';
import { PRICE_MAX_VALUE, PRICE_MIN_VALUE } from '../../utils/constants';
import helpers from '../../utils/helpers';
import { Input, Typography } from '../design-system';
import './price-range-menu.sass';

/**
 * For a futur version, I would add in input range -> min - max
 */

interface PriceRangeMenuProps {
    /**
     * This method is used to tell the parent component to
     * activate an indicator that price filter is being used.
     */
    isFormFilled: (filled: boolean) => void;
    minPriceRef: React.RefObject<HTMLInputElement>;
    // maxPriceRef: React.RefObject<HTMLInputElement>;
}

const PriceRangeMenu = React.memo(function PriceRangeMenu({ isFormFilled, minPriceRef }: PriceRangeMenuProps) {
    // Local state
    const [priceInput, setPriceInput] = React.useState<IFormInput>({
        value: '',
        error: false,
        errMsg: '',
    });

    // Listen for changes in the input value to take furthur actions
    React.useEffect(() => {
        // Indicate to the parent component that price form
        // has some valid value and can be used for the query.
        if (priceInput.error === false && priceInput.value.length > 0) {
            isFormFilled(true);
        } else {
            isFormFilled(false);
        }
    }, [priceInput]);

    // price inputs onChange handler
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Update input values
        setPriceInput((prev) => simplePriceValidation({ ...prev, value: e.target.value }));
    };

    // Simple input price validation
    const simplePriceValidation = (currentState: IFormInput) => {
        const partialState = { ...currentState };

        if (currentState.value.trim().length > 0) {
            // only allow numbers and value should be between valid price bounds
            if (!helpers.validatePriceValue(currentState.value.trim(), PRICE_MIN_VALUE, PRICE_MAX_VALUE)) {
                partialState.errMsg = 'Please input a valid value';
                partialState.error = true;
            }
        } else {
            // when input is empty, there should be no error
            partialState.error = false;
            partialState.errMsg = '';
        }

        // update state
        return partialState;
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