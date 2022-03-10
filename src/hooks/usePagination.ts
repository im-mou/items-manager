import React from 'react';
import { IItem, IOrderByFilter } from '../types/types';
import { ITEMS_PER_PAGE } from '../utils/constants';
import helpers from '../utils/helpers';

interface IUsePaginationProps {
    itemsPerPage: number;
    initialOffset: number;
}
// Hook to paginate a list of items
const usePagination = ({ itemsPerPage = ITEMS_PER_PAGE, initialOffset = 1 }: Partial<IUsePaginationProps>) => {
    // Internal State
    const [sourceItems, setSourceItems] = React.useState<IItem[]>([]);
    const [paginator, setPaginator] = React.useState<{
        items: IItem[];
        currentOffset: number;
        lastPage: boolean;
    }>({
        items: [],
        currentOffset: 0,
        lastPage: true,
    });

    const [orderBy, setOrderBy] = React.useState<IOrderByFilter>({
        key: 'title',
        asc: true,
    });

    /**
     * function to initialize the paginator with items array
     */
    const paginate = React.useCallback(
        (initialItems: IItem[], initialOrderBy?: IOrderByFilter) => {
            if (initialItems.length > 0) {
                // sort item by default upon loading the data
                const sortedList = __internal_sort(
                    initialItems,
                    initialOrderBy || {
                        key: 'title',
                        asc: true,
                    },
                );

                // save source data
                setSourceItems(sortedList);

                // Set initial home page items data
                setPaginator({
                    items: sortedList.slice(0, initialOffset * itemsPerPage),
                    currentOffset: initialOffset,
                    lastPage: itemsPerPage >= initialItems.length,
                });
            } else {
                // reset data
                setSourceItems([]);
                setPaginator({
                    items: [],
                    currentOffset: 0,
                    lastPage: true,
                });
            }
        },
        [setSourceItems, setPaginator],
    );

    /**
     * function to push the next page into the pagination view
     */
    const feed = () => {
        if (paginator.lastPage === false) {
            const newState = { ...paginator };

            // update pagination offset and determine if last page has arrived
            newState.currentOffset = newState.currentOffset + 1;

            // Pluck next 'ITEMS_PER_PAGE' items for the home page
            newState.items = sourceItems.slice(0, newState.currentOffset * itemsPerPage);

            // check if there are gonna be more pages after this run
            if (newState.currentOffset >= Math.ceil(sourceItems.length / itemsPerPage)) {
                newState.lastPage = true;
            }

            // Update state
            setPaginator(newState);
        }
    };

    /**
     * Function to sort the items
     */
    const sort = (orderBy: IOrderByFilter) => {
        // sort
        const sortedList = __internal_sort(sourceItems, orderBy);

        // save source data
        setSourceItems(sortedList);

        // sort items and set state
        setPaginator(prev => ({
            ...prev,
            items: sortedList.slice(0, initialOffset * itemsPerPage),
        }));

        // update orderby state
        setOrderBy(orderBy);
    };

    // internal function to sort items
    const __internal_sort = (items: IItem[], orderBy: IOrderByFilter) => {
        // select sorter
        let sorter = helpers.sortByStringValues;
        if (orderBy.key === 'price') {
            // sort numbers
            sorter = helpers.sortByNumericValues;
        }

        return [...items].sort(sorter(orderBy));
    };

    // expose variables
    return {
        paginate,
        feedItems: feed,
        items: paginator.items,
        isItLastPage: paginator.lastPage,
        currentOffset: paginator.currentOffset,
        orderBy: {
            state: orderBy,
            sort,
        },
    };
};

export default usePagination;
