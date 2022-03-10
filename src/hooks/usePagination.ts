import React from 'react';
import { ITEMS_PER_PAGE } from '../utils/constants';

interface IUsePaginationProps {
    itemsPerPage: number;
    initialOffset: number;
}
// Hook to paginate a list of items
const usePagination = <T>({ itemsPerPage = ITEMS_PER_PAGE, initialOffset = 1 }: Partial<IUsePaginationProps>) => {
    // Internal State
    const [sourceItems, setSourceItems] = React.useState<T[]>([]);
    const [paginator, setPaginator] = React.useState<{
        items: T[];
        currentOffset: number;
        lastPage: boolean;
    }>({
        items: [],
        currentOffset: 0,
        lastPage: true,
    });

    /**
     * function to initialize the paginator with items array
     */
    const paginate = React.useCallback(
        (initialItems: T[]) => {
            if (initialItems.length > 0) {
                // save source data
                setSourceItems(initialItems);

                // Set initial home page items data
                setPaginator({
                    items: initialItems.slice(0, initialOffset * itemsPerPage),
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
     * function to push the next page into the paginatior view
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

    return {
        paginate,
        items: paginator.items,
        isItLastPage: paginator.lastPage,
        currentOffset: paginator.currentOffset,
        feedItems: feed,
    };
};

export default usePagination;
