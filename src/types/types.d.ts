import { ORDER_BY_KEYS } from '../utils/constants';

// TYpes and interfaces

// we use a raw item interface because we are not recieving
// id from server.
//
// Due to the nature of the app, there can be a case where
// two item can have the same name
export interface IRawItem {
    title: string;
    description: string;
    price: string;
    email: string;
    image: string;
}

// Throughout the app we will use this interface.
// Upon fetching the data, we will manulaly generate
// and assign unique ids to each item
export interface IItem extends IRawItem {
    _id: string;
}

export interface IPaginator {
    currentOffset: number;
    lastPage: boolean;
}

export interface ISearchQuery {
    active: boolean;
    term: string;
    price: string | undefined;
}

export interface IFormInput {
    value: string;
    error: boolean;
    errMsg: string;
}

export interface IOrderByFilter {
    key: typeof ORDER_BY_KEYS[number];
    asc: boolean;
}

export type TViewsKeys = 'home' | 'search';
