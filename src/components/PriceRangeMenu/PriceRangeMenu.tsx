import React from 'react';
import { IFormInput } from '../../types/types';
import helpers from '../../utils/helpers';
import { Button, Input, Typography } from '../design-system';
import './price-range-menu.sass';

interface PriceRangeMenuProps {
    /**
     * This method is used to tell the parent component to
     * activate an indicator that price filter is being used.
     */
    isFormFilled: (filled: boolean) => void;
    minPriceRef: React.RefObject<HTMLInputElement>;
    maxPriceRef: React.RefObject<HTMLInputElement>;
    submitSearch: () => void;
}

const PriceRangeMenu = React.memo(function PriceRangeMenu({
    isFormFilled,
    minPriceRef,
    maxPriceRef,
    submitSearch,
}: PriceRangeMenuProps) {
    // Local state
    const [priceInputs, setPriceInputs] = React.useState<{ min: IFormInput; max: IFormInput }>({
        min: { value: '', error: false, errMsg: '' },
        max: { value: '', error: false, errMsg: '' },
    });

    // Listener for when the price inputs are changed
    // - We'll verify is the form is filled correctly
    // - If so, we'll tell the parent component that it can use price values for the search
    React.useEffect(() => {
        if ([priceInputs.min.error, priceInputs.max.error].includes(true) === false) {
            isFormFilled(helpers.isset(priceInputs.min.value) || helpers.isset(priceInputs.max.value));
        } else {
            isFormFilled(false);
        }
    }, [priceInputs]);

    // price inputs onChange handler
    const onChange = (input: 'min' | 'max') => (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        // set form value and also validate them
        setPriceInputs(prev => {
            const newFormState = { ...prev };

            // reset input errors
            newFormState.min = { value: newFormState.min.value, error: false, errMsg: '' };
            newFormState.max = { value: newFormState.max.value, error: false, errMsg: '' };

            // validate and set min/max price
            newFormState[input].value = inputValue;

            if (helpers.isset(inputValue) && !helpers.validatePriceValue(inputValue)) {
                newFormState[input].error = true;
                newFormState[input].errMsg = 'invalid value';

                // early exit if any of the input fail individual validation
                return newFormState;
            }

            // Validate price range
            const maxValueExists = helpers.isset(newFormState.max.value);
            const minValueExists = helpers.isset(newFormState.min.value);

            // verify that if a max price is present, then there should be a min price too.
            if (maxValueExists && !minValueExists) {
                newFormState.min.error = true;
                newFormState.min.errMsg = 'must must have value';
            }

            // Verify that if min and max price is present, the price range is valid.
            if (maxValueExists && minValueExists) {
                const isPriceRangeValid = helpers.validatePriceRange(newFormState.min.value, newFormState.max.value);

                if (isPriceRangeValid === false) {
                    newFormState.max.error = true;
                    newFormState.max.errMsg = 'must be greater than minimum price';
                }
            }

            return newFormState;
        });
    };

    // Listen to enter key to trigger the submit query
    const onEnterKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSubmit();
        }
    };

    // Submit function
    const onSubmit = () => {
        // If there is no error, we'll submit
        if ([priceInputs.min.error, priceInputs.max.error].includes(true) === false) {
            submitSearch();
        }
    };

    // Clear from state
    const clearForm = () => {
        isFormFilled(false);

        // Reset state
        const emptyForm = { value: '', error: false, errMsg: '' };
        setPriceInputs({ min: emptyForm, max: emptyForm });
    };

    return (
        <div className="price-range-menu">
            <Typography variant="h4">Filter by price</Typography>
            <Typography variant="caption">Input a price</Typography>
            <div className="price-range-form">
                <div className="price-range-form__body">
                    <Input
                        className="price-range-form__input"
                        ref={minPriceRef}
                        value={priceInputs.min.value}
                        error={priceInputs.min.error}
                        onChange={onChange('min')}
                        placeholder="Min price..."
                        onKeyUp={onEnterKeyPress}
                    />
                    <Input
                        className="price-range-form__input"
                        ref={maxPriceRef}
                        value={priceInputs.max.value}
                        error={priceInputs.max.error}
                        onChange={onChange('max')}
                        placeholder="No limit"
                        onKeyUp={onEnterKeyPress}
                    />
                </div>

                <div className="errors">
                    {/** Error message indicator */}
                    {priceInputs.min.error ? (
                        <Typography variant="caption" className="errors__error-message">
                            Min price: {priceInputs.min.errMsg}
                        </Typography>
                    ) : null}
                    {priceInputs.max.error ? (
                        <Typography variant="caption" className="errors__error-message">
                            Max price: {priceInputs.max.errMsg}
                        </Typography>
                    ) : null}
                </div>

                <div className="price-range-form__footer">
                    <a
                        href="#"
                        onClick={e => {
                            e.preventDefault();
                            clearForm();
                        }}
                    >
                        <Typography variant="caption">Clear form</Typography>
                    </a>

                    <Button aria-label="apply search filter" color="primary" onClick={onSubmit}>
                        Apply Filter
                    </Button>
                </div>
            </div>
        </div>
    );
});

export default PriceRangeMenu;
