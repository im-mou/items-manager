// Helpers
// ----------------------

import { IItem, IOrderByFilter } from '../types/types';

const validatePriceValue = (value: string, lowerBound: number, upperBound: number) => {
    const price = parseInt(value);

    if (!isNaN(price)) {
        return price >= lowerBound && price < upperBound;
    } else {
        return false;
    }
};

const validatePriceRange = (min: string, max: string) => {
    const minimum = +min;
    const maximum = +max;

    // make sure min < max
    if (!isNaN(minimum) && !isNaN(maximum)) {
        return !(minimum > maximum);
    } else {
        return false;
    }
};

/**
 *
 * As far as I know javascript uses, qsort or quicksort or radix sort depending on the input.
 * I'm gonna rely on that.
 *
 */
const sortByStringValues = (orderby: IOrderByFilter) => (i1: IItem, i2: IItem) => {
    if (orderby.asc) return i1[orderby.key].localeCompare(i2[orderby.key]);
    else return i2[orderby.key].localeCompare(i1[orderby.key]);
};

const sortByNumericValues = (orderby: IOrderByFilter) => (i1: IItem, i2: IItem) => {
    if (orderby.asc) return parseInt(i1[orderby.key]) - parseInt(i2[orderby.key]);
    else return parseInt(i2[orderby.key]) - parseInt(i1[orderby.key]);
};

/**
 * Very simple indexOf string filter.
 * It takes an object where the keys are the '_id' and the value
 * is sentence form which we have to search a substring.
 *
 * Ideally I would've used a fuzzy search but for this
 * test this funtion will do it.
 *
 * @param token string to search
 * @param haystack list of sentencez form which we have to search the token
 * @returns list of id's of items with a match
 */
const searchString = (token: string, haystack: { [key: string]: string }) => {
    return Object.entries(haystack)
        .filter(([, sentence]) => sentence.indexOf(token) !== -1)
        .map((item) => item[0]); // return only found objects ids
};

// let's not pollute the global namespace
export default {
    validatePriceValue,
    validatePriceRange,
    sortByStringValues,
    sortByNumericValues,
    searchString,
};
