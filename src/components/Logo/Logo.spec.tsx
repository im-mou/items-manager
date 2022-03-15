import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Logo from './Logo';

// Configure enzyme for react 17
Enzyme.configure({ adapter: new Adapter() });

// common vars
let wrapper: ShallowWrapper<typeof Logo>;

describe('Logo component', () => {
    beforeAll(() => {
        wrapper = shallow(<Logo />);
    });

    afterAll(() => {
        wrapper.unmount();
    });

    it('should load correctly', () => {
        expect(wrapper.find('.logo').exists()).toBeTruthy();
    });

    it('should be a hyperlink element', () => {
        expect(wrapper.first().type()).toBe('a');
        expect(wrapper.first().prop('href')).toBe('/');
    });

    it('should have full logo', () => {
        expect(wrapper.find('.logo__desktop').exists()).toBeTruthy();
    });

    it('should have mobile logo', () => {
        expect(wrapper.find('.logo__mobile').exists()).toBeTruthy();
    });
});
