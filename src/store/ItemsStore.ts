import { makeAutoObservable } from 'mobx';
import { itemsService } from '../services/items.service';
import { IItem, IPaginator } from '../types/types';
import { ITEMS_PER_PAGE } from '../utils/constants';

// Reactive global Store for items
// --------------------------------

class ItemsStore {
    // data variables
    sourceItemsList: IItem[] = [];
    homePageitemsList: IItem[] = [];
    searchitemsList: IItem[] = [];
    favouriteitemsList: IItem[] = [];

    // UI Variables
    searchViewActive = false;

    // Home page pagination info (Load more... button)
    pagination: IPaginator = {
        currentOffset: 0,
        lastPage: true,
    };

    // ctor
    constructor() {
        makeAutoObservable(this, {}, { deep: true });
    }

    // Store initializer
    async init() {
        // FEtch items from server
        await this.fetchAllItems();

        // pluck initial items to show on the home page
        this.feedItems();
    }

    // Function to fetch all the item from the server
    fetchAllItems = async () => {
        try {
            // server call
            const response = await itemsService.getAll();

            // Error handling
            if (!response?.items) throw new Error('Could not fetch items list from server.');

            // save data into the store
            this.sourceItemsList = response.items.map((item, index) => ({
                // Generate unqiue id for each item
                _id: `${item.title}--${+new Date()}--${index}`,
                ...item,
            }));

            // Set initial home page items data
            if (response.items.length > 0) {
                this.pagination.currentOffset = 1;
                this.pagination.lastPage = false;
            }
        } catch {
            throw new Error('Could not fetch data from server.');
        }
    };

    // paginate items
    feedItems = () => {
        if (this.pagination.lastPage === false) {
            // Pluck next 'ITEMS_PER_PAGE' items for the home page
            this.homePageitemsList = this.sourceItemsList.slice(0, this.pagination.currentOffset * ITEMS_PER_PAGE);

            // update pagination offset and determine if last page has arrived
            this.pagination.currentOffset += 1;
            if (this.pagination.currentOffset >= Math.ceil(this.sourceItemsList.length / ITEMS_PER_PAGE)) {
                this.pagination.lastPage = true;
            }
        }
    };

    // add an item to favourite list
    addItemToFavourite = (item: IItem) => {
        if (!item) throw new Error('No item was provided');

        // push to favourite
        this.favouriteitemsList.push(item);
    };

    // remove an item from favourite list
    removeItemfromFavourite = (id: string) => {
        if (!id) throw new Error('No item id was provided');

        // Find the index of the item
        const index = this.favouriteitemsList.findIndex((item) => item._id === id);

        if (index !== -1) {
            // inplace delete
            this.favouriteitemsList.splice(index, 1);
        } else {
            throw new Error('No item id was provided');
        }
    };
}

export default ItemsStore;
