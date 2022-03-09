import { makeAutoObservable } from 'mobx';
import { itemsService } from '../services/items.service';
import { IItem, IOrderByFilter, IPaginator, ISearchQuery, TViewsKeys } from '../types/types';
import { ITEMS_PER_PAGE } from '../utils/constants';
import helpers from '../utils/helpers';

// Reactive global Store for items
// --------------------------------

class ItemsStore {
    // data variables
    sourceItemsList: IItem[] = [];
    homePageitemsList: IItem[] = [];
    searchitemsList: IItem[] = [];
    favouriteitemsList: IItem[] = [];

    // UI Variables
    search: ISearchQuery = {
        active: false,
        term: '',
        price: undefined,
    };

    // This variable with have (title, description, email) in a single string to apply regex for fast search
    searchTokens: { [key: string]: string } = {};

    // Home page pagination info (Load more... button)
    pagination: IPaginator = {
        currentOffset: 0,
        lastPage: true,
    };

    // Order by filter
    orderBy: IOrderByFilter = {
        key: 'title',
        asc: true,
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

        // apply sort to home view list
        this.applyOrderByFilter('home');

        // We will create an object concatenating all the string (title, description, email) in a single string
        // to apply Regex or use indexOf to it. For the next searches, the data will be cached.
        if (Object.keys(this.searchTokens).length === 0) {
            this.sourceItemsList.forEach(item => {
                this.searchTokens[item._id] = [item.title, item.email, item.description].join(' ').toLowerCase();
            });
        }
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
        const index = this.favouriteitemsList.findIndex(item => item._id === id);

        if (index !== -1) {
            // inplace delete
            this.favouriteitemsList.splice(index, 1);
        } else {
            throw new Error('No item id was provided');
        }
    };

    // Set search query parametes
    setSearchQuery(searchQuery: ISearchQuery) {
        if (!searchQuery) throw new Error('No search query was provided');
        this.search = searchQuery;

        // Create filter pipeline
        const filterPipeLine = [];

        // Apply string 'term' search filter 'term' if present
        if (this.search.term.trim().length) {
            // Create a filter for the pipeline
            const textSearchFilter = (items: IItem[]) => {
                const foundIds = helpers.searchString(searchQuery.term, this.searchTokens);
                return items.filter((item: IItem) => foundIds.includes(item._id));
            };

            // push filter to pipeline
            filterPipeLine.push(textSearchFilter);
        }

        // Apply price search if 'price' is present
        if (this.search.price) {
            const priceSearchFilter = (items: IItem[]) => {
                return items.filter((item: IItem) => item.price == this.search.price);
            };

            // push filter to pipeline
            filterPipeLine.push(priceSearchFilter);
        }

        // Todo: Add price range filter
        // ...

        // Check if we have filter in our pipeline
        if (filterPipeLine.length > 0) {
            // Run pipeline and save the output to store
            this.searchitemsList = filterPipeLine.reduce((item, filter) => filter(item), this.sourceItemsList);
        }
    }

    // clear search
    closeSearchView() {
        this.search = {
            active: false,
            term: '',
            price: undefined,
        };
    }

    // update orderby filter
    setOrderByFilter = (orderBy: IOrderByFilter) => {
        if (!orderBy) throw new Error('No data was provided');
        this.orderBy = orderBy;
    };

    // function to sort items
    applyOrderByFilter = (view: TViewsKeys) => {
        // select sorter
        let sorter = helpers.sortByStringValues;
        if (this.orderBy.key === 'price') {
            // sort numbers
            sorter = helpers.sortByNumericValues;
        }

        // sort items
        if (view === 'home') this.homePageitemsList.sort(sorter(this.orderBy));
        if (view === 'search') this.searchitemsList.sort(sorter(this.orderBy));
    };
}

export default ItemsStore;
