import { makeAutoObservable } from 'mobx';
import { itemsService } from '../services/items.service';
import { IItem, ISearchQuery } from '../types/types';
import helpers from '../utils/helpers';

// Reactive global Store for items
// --------------------------------

class RootStore {
    // data variables
    sourceItemsList: IItem[] = [];

    // Different views data which will be derived from this.sourceItemsList
    searchitemsList: IItem[] = [];
    favouriteitemsList: IItem[] = [];

    // UI Variables
    search: ISearchQuery = {
        active: false,
        term: '',
        price: {
            min: '',
            max: '',
        },
    };

    // This variable will keep the paginated offset and order by so when we come back from search view
    // we're are at the same offset and with the same ordering
    homepageOffset = 1;

    // This variable with have (title, description, email) in a single string to apply regex for fast search
    searchTokens: { [key: string]: string } = {};

    initialized = false;

    // ctor
    constructor() {
        makeAutoObservable(this, {}, { deep: true });
    }

    // Store initializer
    init = async () => {
        // FEtch items from server
        await this.fetchAllItems();

        // We will create an object concatenating all the string (title, description, email) in a single string
        // to apply Regex or use indexOf to it. For the next searches, the data will be cached.
        if (Object.keys(this.searchTokens).length === 0) {
            this.sourceItemsList.forEach(item => {
                this.searchTokens[item._id] = [item.title, item.email, item.description]
                    .join(' ') // concat into a string
                    .toLowerCase() // self explanatory
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, ''); // remove special chars for the search
            });
        }

        this.initialized = true;
    };

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
        } catch {
            throw new Error('Could not fetch data from server.');
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

    // Set search query parametes and execute query
    searchItems(searchQuery: Omit<ISearchQuery, 'active'>) {
        if (!searchQuery) throw new Error('No search query was provided');
        this.search = { ...searchQuery, active: true };

        // Create filter pipeline
        const filterPipeLine = [];

        // Apply string 'term' search filter 'term' if present
        if (this.search.term.trim().length) {
            // Create a filter for the pipeline
            const foundIds = helpers.searchString(helpers.nomalizeSearchString(searchQuery.term), this.searchTokens);
            const textSearchFilter = (items: IItem[]) => {
                return items.filter((item: IItem) => foundIds.includes(item._id));
            };

            // push filter to pipeline
            filterPipeLine.push(textSearchFilter);
        }

        // Apply price search if min 'price' is present
        if (helpers.isset(this.search.price.min)) {
            const minPriceSearchFilter = (items: IItem[]) => {
                return items.filter((item: IItem) => Number(item.price) >= Number(this.search.price.min));
            };

            // push filter to pipeline
            filterPipeLine.push(minPriceSearchFilter);
        }

        // Apply price search if max 'price' is present
        if (helpers.isset(this.search.price.max)) {
            const maxPriceSearchFilter = (items: IItem[]) => {
                return items.filter((item: IItem) => Number(item.price) <= Number(this.search.price.max));
            };

            // push filter to pipeline
            filterPipeLine.push(maxPriceSearchFilter);
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
            price: { min: '', max: '' },
        };
    }

    // Set homepage view offset count
    setHomepageOffset = (offset: number) => {
        if (!offset) throw new Error('No data was provided');
        this.homepageOffset = offset;
    };
}

export default RootStore;
