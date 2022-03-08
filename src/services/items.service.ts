import { IRawItem } from '../types/types';
import BaseService from './base.service';

class ItemsService extends BaseService {
    // Get all items list
    public getAll = async () => {
        return this.get<{ items: IRawItem[] }>(this.apiBaseUrl + '/items.json');
    };

    // If we had a proper backend w/ a database, here we would defined all
    // the methods (related to items) to get diferent type of info.
    //
    // ex.:
    // -> get items count
    // -> get first 5 items (paginated from the server, how it should be)
    // -> get aditional details of a specific item
    // ...
}

// Good'ol poor man's singleton
export const itemsService = new ItemsService();
