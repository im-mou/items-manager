import Enzyme, { mount, ReactWrapper } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import OrderByFilter from './';
import { ORDER_BY_KEYS } from '../../utils/constants';

// Configure enzyme for react 17
Enzyme.configure({ adapter: new Adapter() });

// mocks
const sortCallback = jest.fn();

// common vars
let wrapper: ReactWrapper<typeof OrderByFilter>;

describe('OrderBy Menu', () => {
    afterEach(() => {
        jest.resetAllMocks();
        wrapper.unmount();
    });

    it('should load correctly', () => {
        wrapper = mount(<OrderByFilter sort={sortCallback} orderByState={{ key: ORDER_BY_KEYS[0], asc: true }} />);

        expect(wrapper.find('.orderby-filter').exists()).toBeTruthy();
        expect(wrapper.find('[data-testid="orderby-filter-trigger"]').exists()).toBeTruthy();
    });

    it('should open the menu on clicking the trigger', () => {
        wrapper = mount(<OrderByFilter sort={sortCallback} orderByState={{ key: ORDER_BY_KEYS[0], asc: true }} />);

        expect(wrapper.find('.popover-portal--active').exists()).toBeFalsy();

        wrapper.find('[data-testid="orderby-filter-trigger"]').find('button').simulate('click');

        expect(wrapper.find('.popover-portal--active').exists()).toBeTruthy();
    });

    it('should test orderByState props is rendered correctly', () => {
        const keyIndex = 0;
        const asc = false;

        wrapper = mount(<OrderByFilter sort={sortCallback} orderByState={{ key: ORDER_BY_KEYS[keyIndex], asc }} />);

        const items = wrapper.find('.list-container').children();

        items.forEach((item, i) => {
            expect(
                item
                    .find(`[data-testid="orderby-filter-${asc ? 'asc' : 'desc'}"]`)
                    .find('.list-container__item--selected')
                    .exists(),
            )[keyIndex === i ? 'toBeTruthy' : 'toBeFalsy']();
        });
    });

    it('should test orderByState props is rendered correctly with a diferent config', () => {
        const keyIndex = 3;
        const asc = true;

        wrapper = mount(<OrderByFilter sort={sortCallback} orderByState={{ key: ORDER_BY_KEYS[keyIndex], asc }} />);

        const items = wrapper.find('.list-container').children();

        items.forEach((item, i) => {
            expect(
                item
                    .find(`[data-testid="orderby-filter-${asc ? 'asc' : 'desc'}"]`)
                    .find('.list-container__item--selected')
                    .exists(),
            )[keyIndex === i ? 'toBeTruthy' : 'toBeFalsy']();
        });
    });

    it('should invoke sort function on clicking a sort by random index and random order', () => {
        wrapper = mount(<OrderByFilter sort={sortCallback} orderByState={{ key: 'title', asc: true }} />);

        ORDER_BY_KEYS.forEach((item, index) => {
            wrapper
                .find('.list-container')
                .children()
                .at(index)
                .find(`[data-testid="orderby-filter-${index % 2 ? 'asc' : 'desc'}"]`)
                .find('button')
                .simulate('click');

            expect(sortCallback).toBeCalledWith({
                key: item,
                asc: Boolean(index % 2),
            });
        });
    });
});
