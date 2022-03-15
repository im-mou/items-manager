import Enzyme, { mount, ReactWrapper } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Hero from './Hero';

// Configure enzyme for react 17
Enzyme.configure({ adapter: new Adapter() });

// common vars
let wrapper: ReactWrapper<typeof Hero>;

describe('Hero component', () => {
    beforeAll(() => {
        wrapper = mount(<Hero />);
    });

    afterAll(() => {
        wrapper.unmount();
    });

    it('should load correctly', () => {
        expect(wrapper.find('.hero').exists()).toBeTruthy();
    });

    it('should have correct heading tagline', () => {
        const heroTitle = wrapper.find('.hero__title');

        expect(heroTitle.exists()).toBeTruthy();
        expect(heroTitle.at(0).text()).not.toBe('');
        expect(heroTitle.at(0).text()).toBe('Welcome to ItemManager');
    });

    it('should have correct subheading tagline', () => {
        const heroSubtitle = wrapper.find('.hero__subtitle');

        expect(heroSubtitle.exists()).toBeTruthy();
        expect(heroSubtitle.at(0).text()).not.toBe('');
        expect(heroSubtitle.at(0).text()).toBe('Find anything you want, sell what you don’t need.');
    });

    it('should have svg background animated icon', () => {
        expect(wrapper.find('.hero__icon').exists()).toBeTruthy();
    });
});
