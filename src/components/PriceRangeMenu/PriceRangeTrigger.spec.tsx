import Enzyme, { mount, ReactWrapper } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { PriceRangeTrigger } from './';

// Configure enzyme for react 16
Enzyme.configure({ adapter: new Adapter() });

// mocks
const openMenuCallback = jest.fn();

// common vars
let wrapper: ReactWrapper<typeof PriceRangeTrigger>;

describe('Price Range Menu Trigger', () => {
    afterEach(() => {
        jest.resetAllMocks();
        wrapper.unmount();
    });

    it('should load correctly', () => {
        wrapper = mount(
            <PriceRangeTrigger
                openMenu={openMenuCallback}
                isMenuOpen={false}
                isPriceInputActive={false}
                minPriceValue=""
                maxPriceValue=""
            />,
        );

        expect(wrapper.find('.price-menu-trigger').exists()).toBeTruthy();
        expect(wrapper.find('.price-menu-trigger').find('button').exists()).toBeTruthy();
    });

    it('should have active class if isPriceInputActive props is active', () => {
        wrapper = mount(
            <PriceRangeTrigger
                openMenu={openMenuCallback}
                isMenuOpen={false}
                isPriceInputActive={true}
                minPriceValue=""
                maxPriceValue=""
            />,
        );

        expect(wrapper.find('.price-menu-trigger--active').exists()).toBeTruthy();
    });

    it('should invoke the function to open the menu', () => {
        wrapper = mount(
            <PriceRangeTrigger
                openMenu={openMenuCallback}
                isMenuOpen={false}
                isPriceInputActive={false}
                minPriceValue=""
                maxPriceValue=""
            />,
        );

        wrapper.find('button').simulate('click');

        expect(openMenuCallback).toBeCalledTimes(1);
    });

    it('should not have any price value', () => {
        wrapper = mount(
            <PriceRangeTrigger
                openMenu={openMenuCallback}
                isMenuOpen={false}
                isPriceInputActive={false}
                minPriceValue=""
                maxPriceValue=""
            />,
        );

        expect(wrapper.find('[data-testid="price-range-trigger-value"]').exists()).toBeFalsy();
    });

    it('should have MIN PRICE value', () => {
        wrapper = mount(
            <PriceRangeTrigger
                openMenu={openMenuCallback}
                isMenuOpen={false}
                isPriceInputActive={true}
                minPriceValue="120"
                maxPriceValue=""
            />,
        );

        expect(wrapper.find('[data-testid="price-range-trigger-value"]').text()).toBe('120€');
    });

    it('should have MIN PRICE and MAX PRICE value', () => {
        wrapper = mount(
            <PriceRangeTrigger
                openMenu={openMenuCallback}
                isMenuOpen={false}
                isPriceInputActive={true}
                minPriceValue="10"
                maxPriceValue="1400"
            />,
        );

        expect(wrapper.find('[data-testid="price-range-trigger-value"]').text()).toBe('10€–1400€');
    });

    it('should not have any price value if menu is open', () => {
        wrapper = mount(
            <PriceRangeTrigger
                openMenu={openMenuCallback}
                isMenuOpen={true}
                isPriceInputActive={true}
                minPriceValue="10"
                maxPriceValue="1400"
            />,
        );

        expect(wrapper.find('[data-testid="price-range-trigger-value"]').exists()).toBeFalsy();
    });
});
