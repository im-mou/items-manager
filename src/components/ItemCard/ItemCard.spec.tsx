import Enzyme, { mount, ReactWrapper } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { ItemCard } from './';
import { IItem } from '../../types/types';

// Configure enzyme for react 16
Enzyme.configure({ adapter: new Adapter() });

// mocks
const openDetailsCallback = jest.fn();

jest.mock('../../store', () => ({
    useStore: () => ({
        RootStore: {
            favouriteitemsList: [],
            addItemToFavourite: () => jest.fn(),
            removeItemfromFavourite: () => jest.fn(),
        },
    }),
}));

// common vars
let wrapper: ReactWrapper<typeof ItemCard>;

const ITEM: IItem = {
    _id: '_id',
    title: 'Bolso piel marca Hoss',
    description:
        'Vendo bolso de piel marrón grande de la marca Hoss. Lo compré hace dos temporadas. Esta en perfectas condiciones, siempre se ha guardado en bolsa de tela para su conservación. Precio original de 400 euros. Lo vendo por 250 porque ya casi no me lo pongo. Tiene varios compartimentos dentro.',
    price: '250',
    email: 'bagmail@wallapop.com',
    image: 'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/bag.png',
};

const EMPTY_ITEM: IItem = {
    _id: '_id',
    title: '',
    description: '',
    price: '',
    email: '',
    image: 'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/bag.png',
};

describe('Item Card', () => {
    describe('Props have valid item value', () => {
        beforeAll(() => {
            wrapper = mount(<ItemCard item={ITEM} openDetails={openDetailsCallback} />);
        });

        afterAll(() => {
            jest.resetAllMocks();
            wrapper.unmount();
        });

        it('should load correctly', () => {
            expect(wrapper.find('.item-card').exists()).toBeTruthy();
        });

        it('should show image', () => {
            expect(wrapper.find('.item-card__image > img').prop('src')).toBe(ITEM.image);
        });

        it('should show title', () => {
            expect(wrapper.find('.item-card__title').text()).toBe(ITEM.title);
        });

        it('should show user email', () => {
            expect(wrapper.find('.item-card__user').text()).toBe(ITEM.email);
        });

        it('should show description', () => {
            expect(wrapper.find('.item-card__body').text()).toBe(ITEM.description.slice(0, 100) + '...');
        });

        it('should show the price', () => {
            const priceElText = wrapper.find('[data-testid="item-card-price"]').at(0).text();

            expect(priceElText).not.toBe(ITEM.price);

            expect(priceElText).toBe(`${parseFloat(ITEM.price).toLocaleString('es-ES')}€`);
        });

        it('should open modal in clicking expand button', () => {
            wrapper.find('[data-testid="item-card-expand-button"] > button').simulate('click');

            expect(openDetailsCallback).toBeCalled();
        });
    });

    describe('Props have invalid item value', () => {
        beforeAll(() => {
            wrapper = mount(<ItemCard item={EMPTY_ITEM} openDetails={openDetailsCallback} />);
        });

        afterAll(() => {
            jest.resetAllMocks();
            wrapper.unmount();
        });

        it('should show fallback title', () => {
            expect(wrapper.find('.item-card__title').text()).toBe('-');
        });

        it('should show fallback user email', () => {
            expect(wrapper.find('.item-card__user').text()).toBe(' ');
        });

        it('should show fallback description', () => {
            expect(wrapper.find('.item-card__body').text()).toBe('-');
        });

        it('should show fallback price', () => {
            const priceElText = wrapper.find('[data-testid="item-card-price"]').at(0).text();

            expect(priceElText).toBe('-€');
        });
    });
});
