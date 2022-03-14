import Enzyme, { shallow, mount, ShallowWrapper, ReactWrapper } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import PriceRangeMenu from './PriceRangeMenu';
import React, { HTMLAttributes } from 'react';
import { ERRORS, PRICE_MAX_VALUE } from '../../utils/constants';

// Configure enzyme for react 16
Enzyme.configure({ adapter: new Adapter() });

// mocks
const submitSearchCallback = jest.fn();
const setIsFormFilled = jest.fn();
const minPriceRef = React.createRef<HTMLInputElement>();
const maxPriceRef = React.createRef<HTMLInputElement>();

// common vars
let shallowWrapper: ShallowWrapper<typeof PriceRangeMenu>;
let wrapper: ReactWrapper<typeof PriceRangeMenu>;
let minPriceInput: ReactWrapper<HTMLAttributes<HTMLInputElement>>;
let maxPriceInput: ReactWrapper<HTMLAttributes<HTMLInputElement>>;
let submitButton: ReactWrapper<HTMLAttributes<HTMLButtonElement>>;
let errors: ReactWrapper<HTMLAttributes<HTMLDivElement>>;

describe('Price Range Menu Component', () => {
    beforeEach(() => {
        wrapper = mount(
            <PriceRangeMenu
                setIsFormFilled={setIsFormFilled}
                minPriceRef={minPriceRef}
                maxPriceRef={maxPriceRef}
                submitSearch={submitSearchCallback}
            />,
        );
        minPriceInput = wrapper.find('[data-testid="price-range-input-min"]').find('input');
        maxPriceInput = wrapper.find('[data-testid="price-range-input-max"]').find('input');
        submitButton = wrapper.find('[data-testid="price-range-menu-submit"]').find('button');
        errors = wrapper.find('.errors');
    });

    afterEach(() => {
        jest.resetAllMocks();
        wrapper.unmount();
    });

    it('should load correctly', () => {
        shallowWrapper = shallow(
            <PriceRangeMenu
                setIsFormFilled={setIsFormFilled}
                minPriceRef={minPriceRef}
                maxPriceRef={maxPriceRef}
                submitSearch={submitSearchCallback}
            />,
        );
        expect(shallowWrapper.find('price-range-menu')).toBeTruthy();
        expect(shallowWrapper.childAt(0).dive().text()).toMatch(/Filter by price/);
        expect(shallowWrapper.childAt(1).dive().text()).toMatch(/Input a price/);

        expect(minPriceInput.exists()).toBeTruthy();
        expect(maxPriceInput.exists()).toBeTruthy();

        shallowWrapper.unmount();
    });

    it('should not submit if form is not filled', () => {
        submitButton.simulate('click');

        expect(submitSearchCallback).not.toBeCalled();
    });

    it('should fill the form correctly and be able to submit form', () => {
        maxPriceInput.simulate('change', { target: { value: '130' } });
        minPriceInput.simulate('change', { target: { value: '120' } });

        submitButton.simulate('click');

        // should notify the parent component
        expect(setIsFormFilled).toBeCalled();
        expect(setIsFormFilled.mock.calls.pop()).toEqual([true]);

        expect(submitSearchCallback).toBeCalledTimes(1);
    });

    it('cannot submit if MIN PRICE is not present', () => {
        maxPriceInput.simulate('change', { target: { value: '130' } });
        submitButton.simulate('click');

        expect(errors.text().toLowerCase()).toMatch(`min price: ${ERRORS.priceRange.missingValue}`);
        expect(submitSearchCallback).not.toBeCalled();
    });

    it('shows error if MIN PRICE value is invalid', () => {
        minPriceInput.simulate('change', { target: { value: 'asd1304' } });
        submitButton.simulate('click');

        expect(errors.text().toLowerCase()).toMatch(`min price: ${ERRORS.priceRange.invalidValue}`);
        expect(submitSearchCallback).not.toBeCalled();
    });

    it('shows error if MAX PRICE value is invalid', () => {
        maxPriceInput.simulate('change', { target: { value: 'asgc' } });

        expect(errors.text().toLowerCase()).toMatch(`max price: ${ERRORS.priceRange.invalidValue}`);
        expect(submitSearchCallback).not.toBeCalled();
    });

    it('shows error if MIN PRICE is higher than max price', () => {
        minPriceInput.simulate('change', { target: { value: '120' } });
        maxPriceInput.simulate('change', { target: { value: '100' } });

        expect(errors.text().toLowerCase()).toMatch(`max price: ${ERRORS.priceRange.rangeNotValid}`);
        expect(submitSearchCallback).not.toBeCalled();
    });

    it('shows error if both prices are the same', () => {
        minPriceInput.simulate('change', { target: { value: '0' } });
        maxPriceInput.simulate('change', { target: { value: '0' } });

        expect(errors.text().toLowerCase()).toMatch(`max price: ${ERRORS.priceRange.rangeNotValid}`);
        expect(submitSearchCallback).not.toBeCalled();

        minPriceInput.simulate('change', { target: { value: '100' } });
        maxPriceInput.simulate('change', { target: { value: '100' } });

        expect(errors.text().toLowerCase()).toMatch(`max price: ${ERRORS.priceRange.rangeNotValid}`);
        expect(submitSearchCallback).not.toBeCalled();
    });

    it('shows error if MIN PRICE is below the limit', () => {
        minPriceInput.simulate('change', { target: { value: `${-1}` } });

        expect(errors.text().toLowerCase()).toMatch(`min price: ${ERRORS.priceRange.invalidValue}`);
        expect(submitSearchCallback).not.toBeCalled();
    });

    it('shows error if MIN PRICE is over the limit', () => {
        minPriceInput.simulate('change', { target: { value: `${PRICE_MAX_VALUE + 1}` } });

        expect(errors.text().toLowerCase()).toMatch(`min price: ${ERRORS.priceRange.invalidValue}`);
        expect(submitSearchCallback).not.toBeCalled();
    });

    it('shows error if MAX PRICE is over the limit', () => {
        maxPriceInput.simulate('change', { target: { value: `${PRICE_MAX_VALUE + 1}` } });

        expect(errors.text().toLowerCase()).toMatch(`max price: ${ERRORS.priceRange.invalidValue}`);
        expect(submitSearchCallback).not.toBeCalled();
    });

    it('should clear errors on empting the price inputs', () => {
        maxPriceInput.simulate('change', { target: { value: 'sdfgs' } });
        expect(errors.text().toLowerCase()).toMatch(`max price: ${ERRORS.priceRange.invalidValue}`);

        minPriceInput.simulate('change', { target: { value: 'sdfgd' } });
        expect(errors.text().toLowerCase()).toMatch(`min price: ${ERRORS.priceRange.invalidValue}`);
        expect(errors.text().toLowerCase()).not.toMatch(`min price: ${ERRORS.priceRange.missingValue}`);

        maxPriceInput.simulate('change', { target: { value: '' } });
        minPriceInput.simulate('change', { target: { value: '' } });

        expect(errors.text().toLowerCase()).toMatch('');
    });

    it('should clear the form on clicking the reset button', () => {
        const clearFormButton = wrapper.find('[data-testid="price-range-menu-reset"]');

        expect(minPriceInput.getElement().props.value).toBe('');
        expect(maxPriceInput.getElement().props.value).toBe('');

        minPriceInput.simulate('change', { target: { value: '130' } });
        maxPriceInput.simulate('change', { target: { value: '120' } });

        // @ts-ignore
        expect(minPriceInput.instance().value).toBe('130');
        // @ts-ignore
        expect(maxPriceInput.instance().value).toBe('120');

        expect(errors.text().toLowerCase()).toMatch(`max price: ${ERRORS.priceRange.rangeNotValid}`);

        clearFormButton.simulate('click');

        // @ts-ignore
        expect(minPriceInput.instance().value).toBe('');
        // @ts-ignore
        expect(maxPriceInput.instance().value).toBe('');

        expect(errors.text()).toBe('');

        // should notify the parent component
        expect(setIsFormFilled).toBeCalled();
        expect(setIsFormFilled.mock.calls.pop()).toEqual([false]);
    });

    it('tests price refs have value', () => {
        minPriceInput.simulate('change', { target: { value: '130' } });
        maxPriceInput.simulate('change', { target: { value: '120' } });

        // @ts-ignore
        expect(minPriceInput.getElement().ref.current.value).toBe('130');
        // @ts-ignore
        expect(maxPriceInput.getElement().ref.current.value).toBe('120');
    });
});
