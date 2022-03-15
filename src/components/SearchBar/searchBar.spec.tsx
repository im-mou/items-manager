import Enzyme, { shallow, mount, ShallowWrapper } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { HTMLAttributes } from 'react';
import SearchBar from './SearchBar';

// Configure enzyme for react 17
Enzyme.configure({ adapter: new Adapter() });

// mocks
const submitSearchCallback = jest.fn();
const clearSearchCallback = jest.fn();

// common vars
let wrapper: ShallowWrapper<typeof SearchBar>;
let inputEl: ShallowWrapper<HTMLAttributes<HTMLInputElement>>;

/**
 * Test internal state
 * */
describe('SearchBar Component', () => {
    describe('Test internal state', () => {
        beforeEach(() => {
            wrapper = shallow(
                <SearchBar
                    isSearchActive={false}
                    submitSearch={submitSearchCallback}
                    clearSearch={clearSearchCallback}
                />,
            );
            inputEl = wrapper.find('.text-search__input');
        });

        afterEach(() => {
            jest.resetAllMocks();
            wrapper.unmount();
        });

        it('should load correctly', () => {
            expect(wrapper.first().hasClass('searchbar-wrapper')).toBeTruthy();
            expect(inputEl.exists()).toBeTruthy();
            expect(wrapper.find('[data-testid="price-range-menu"]').exists()).toBeTruthy();
        });

        it('should not have clear search button visible', async () => {
            expect(wrapper.find('[data-testid="clear-search"]').exists()).toBeFalsy();
        });

        it('should test that input wrapper toggles active state on focus and blur', async () => {
            expect(wrapper.find('.text-search--active').exists()).toBeFalsy();

            inputEl.simulate('focus');
            expect(wrapper.find('.text-search--active').exists()).toBeTruthy();

            inputEl.simulate('blur');
            expect(wrapper.find('.text-search--active').exists()).toBeFalsy();
        });

        it('should test that input wrapper is active state when input has value', async () => {
            expect(wrapper.find('.text-search--active').exists()).toBeFalsy();

            inputEl.simulate('change', { target: { value: 'search value' } });
            expect(wrapper.find('.text-search--active').exists()).toBeTruthy();

            inputEl.simulate('change', { target: { value: '' } });
            expect(wrapper.find('.text-search--active').exists()).toBeFalsy();
        });

        /**
         * Test child component price range
         */
        describe('Test submit function behaviour on pressing enter key', () => {
            it('should not invoke submit when there is no search value', () => {
                wrapper.find('.text-search__input').simulate('keyup', { key: 'Enter' });

                expect(submitSearchCallback).not.toBeCalled();
            });

            it('should not invoke submit if enter is not pressed', () => {
                wrapper.find('.text-search__input').simulate('change', { target: { value: 'search value' } });
                wrapper.find('.text-search__input').simulate('keyup', { key: 'A' });

                expect(submitSearchCallback).not.toBeCalled();
            });

            it('should invoke submit function with the input value', () => {
                wrapper.find('.text-search__input').simulate('change', { target: { value: 'search value' } });
                wrapper.find('.text-search__input').simulate('keyup', { key: 'Enter' });

                expect(submitSearchCallback).toBeCalledTimes(1);
                expect(submitSearchCallback).toHaveBeenCalledWith({
                    price: { max: '', min: '' },
                    term: 'search value',
                });
            });
        });

        describe('Test price range values modal', () => {
            const mountedWrapper = mount(
                <SearchBar isSearchActive={false} submitSearch={submitSearchCallback} clearSearch={() => undefined} />,
            );

            const menu = mountedWrapper.find('[data-testid="price-range-menu"]');
            const minPriceInput = mountedWrapper.find('[data-testid="price-range-input-min"]').find('input');
            const maxPriceInput = mountedWrapper.find('[data-testid="price-range-input-max"]').find('input');
            const textSearchInput = mountedWrapper.find('.text-search__input').find('input');

            afterAll(() => {
                // clean up
                mountedWrapper.unmount();
            });

            it('should test price range menu is rendered correctly', () => {
                expect(menu.exists()).toBeTruthy();
                expect(minPriceInput.exists()).toBeTruthy();
                expect(maxPriceInput.exists()).toBeTruthy();
                expect(textSearchInput.exists()).toBeTruthy();
            });

            it('should invoke submit function with price range values', () => {
                // set min and max price values
                maxPriceInput.simulate('change', { target: { value: '20' } });
                minPriceInput.simulate('change', { target: { value: '10' } });

                // Submit
                textSearchInput.simulate('keyup', { key: 'Enter' });

                expect(submitSearchCallback).toBeCalledTimes(1);
                expect(submitSearchCallback).toHaveBeenCalledWith({ price: { max: '20', min: '10' }, term: '' });
            });

            it('should show price range on the price button when a range is set', () => {
                expect(mountedWrapper.find('[data-testid="price-range-trigger-value"]').text()).toBe('10€–20€');
            });
        });
    });

    /**
     * Test props
     */
    describe('Test component props', () => {
        beforeAll(() => {
            wrapper = shallow(
                <SearchBar
                    isSearchActive={true}
                    submitSearch={submitSearchCallback}
                    clearSearch={clearSearchCallback}
                />,
            );
        });

        afterAll(() => {
            jest.resetAllMocks();
            wrapper.unmount();
        });

        it('should show clear search button if "isSearchActive" prop is present', () => {
            expect(wrapper.find('[data-testid="clear-search"]').exists()).toBeTruthy();
        });

        it('should invoke clear search on pressing "clear search" button', () => {
            wrapper.find('[data-testid="clear-search"]').simulate('click');
            expect(clearSearchCallback).toBeCalledTimes(1);
        });
    });
});
