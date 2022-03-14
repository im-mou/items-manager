import usePagination from './usePagination';
import items from '../../__mocks__/items';
import { renderHook, act, RenderResult } from '@testing-library/react-hooks';
import helpers from '../utils/helpers';

let hook: RenderResult<ReturnType<typeof usePagination>>;

const ITEMS_PER_PAGE = 5;

describe('Test usePagination Hook', () => {
    describe('Pagination test', () => {
        beforeAll(() => {
            const { result } = renderHook(() => usePagination({ itemsPerPage: ITEMS_PER_PAGE, initialOffset: 1 }));
            hook = result;

            act(() => hook.current.paginate(items.items));
        });

        it('should show the initial offset', () => {
            expect(hook.current.currentOffset).toBe(1);
        });

        it('should not be the last page', () => {
            expect(hook.current.isItLastPage).toBeFalsy();
        });

        it('should have initial items', () => {
            expect(hook.current.items.length).toBe(ITEMS_PER_PAGE);

            const sortedPageItem = hook.current.sourceItems.slice(0, ITEMS_PER_PAGE);

            expect(hook.current.items).toEqual(sortedPageItem);
        });

        describe('Pagination Feed test', () => {
            beforeAll(() => {
                act(() => hook.current.feedItems());
            });

            it('should have new feed items', () => {
                const sortedPageItem = hook.current.sourceItems.slice(0, ITEMS_PER_PAGE * hook.current.currentOffset);

                expect(hook.current.items.length).toBe(ITEMS_PER_PAGE * hook.current.currentOffset);
                expect(hook.current.items).toEqual(sortedPageItem);
            });
        });

        describe('Test last page', () => {
            beforeAll(() => {
                const { result } = renderHook(() => usePagination({ itemsPerPage: ITEMS_PER_PAGE }));
                hook = result;

                act(() => hook.current.paginate(items.items));

                const iterCount = Math.ceil(items.items.length / ITEMS_PER_PAGE);

                for (let index = 0; index < iterCount; index++) {
                    act(() => hook.current.feedItems());
                }
            });

            it('should have reached last page', () => {
                expect(hook.current.isItLastPage).toBeTruthy();
            });
        });
    });

    describe('Sort test', () => {
        describe('Order by numeric values', () => {
            beforeEach(() => {
                const { result } = renderHook(() => usePagination({ itemsPerPage: ITEMS_PER_PAGE, initialOffset: 1 }));
                act(() => result.current.paginate(items.items));
                hook = result;
            });

            it('should have the initial order', () => {
                expect(hook.current.orderBy.state).toEqual({ key: 'title', asc: true });
            });

            it('Order by price asc', () => {
                act(() => hook.current.orderBy.sort({ key: 'price', asc: true }));

                expect(hook.current.orderBy.state).toEqual({ key: 'price', asc: true });
                expect(hook.current.sourceItems).toEqual(
                    items.items.sort(helpers.sortByNumericValues({ key: 'price', asc: true })),
                );
            });

            it('Order by price desc', () => {
                act(() => hook.current.orderBy.sort({ key: 'price', asc: false }));

                expect(hook.current.orderBy.state).toEqual({ key: 'price', asc: false });
                expect(hook.current.sourceItems).toEqual(
                    items.items.sort(helpers.sortByNumericValues({ key: 'price', asc: false })),
                );
            });
        });

        describe('Order by string values', () => {
            beforeEach(() => {
                const { result } = renderHook(() => usePagination({ itemsPerPage: ITEMS_PER_PAGE, initialOffset: 1 }));
                act(() => result.current.paginate(items.items));
                hook = result;
            });

            it('should have the initial order', () => {
                expect(hook.current.orderBy.state).toEqual({ key: 'title', asc: true });
            });

            it('Order by email asc', () => {
                act(() => hook.current.orderBy.sort({ key: 'email', asc: true }));

                expect(hook.current.orderBy.state).toEqual({ key: 'email', asc: true });
                expect(hook.current.sourceItems).toEqual(
                    items.items.sort(helpers.sortByStringValues({ key: 'email', asc: true })),
                );
            });

            it('Order by description desc', () => {
                act(() => hook.current.orderBy.sort({ key: 'description', asc: false }));

                expect(hook.current.orderBy.state).toEqual({ key: 'description', asc: false });
                expect(hook.current.sourceItems).toEqual(
                    items.items.sort(helpers.sortByStringValues({ key: 'description', asc: false })),
                );
            });
        });
    });
});
