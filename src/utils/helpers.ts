// Helpers
// ----------------------

import { IItem, IOrderByFilter } from '../types/types';
import { PRICE_MAX_VALUE, PRICE_MIN_VALUE } from './constants';

/**
 * Function to determine if an input has value.
 * @param value value to be checked
 * @returns boolean flag indicating if value param has value
 */
const isset = (value: string | number) => {
    return value !== undefined && value !== null && value.toString().trim().length > 0;
};

/**
 * Function to validate a price input
 *
 * @param value Price value to be validated
 * @param lowerBound Minimum numeric value that the value should have
 * @param upperBound Maximum numeric value that the value should have
 * @returns Boolean indicating if the validation conditions are met
 */
const validatePriceValue = (
    value: string,
    lowerBound: number = PRICE_MIN_VALUE,
    upperBound: number = PRICE_MAX_VALUE,
) => {
    const price = Number(value.trim());
    if (!isNaN(price)) {
        return price >= lowerBound && price < upperBound;
    }
    return false;
};

/**
 * Function to validate if price range is valid
 * @param min minimum price value
 * @param max maximum price value
 * @returns Boolean flag indication if price range is valid
 */
const validatePriceRange = (min: string, max: string) => {
    const minimum = +Number(min.trim());
    const maximum = +Number(max.trim());

    // make sure min < max
    if (!isNaN(minimum) && !isNaN(maximum)) {
        return !(minimum >= maximum);
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
        .map(item => item[0]); // return only found objects ids
};

/**
 * Function to parse string for search query
 * - removes whitespaces
 * - cvt to lowercase
 *
 * @param string string to be normalized
 * @returns string that can be used to search
 */
const nomalizeSearchString = (string: string) => {
    return string
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

    // Add other ops if necessary
};

// let's not pollute the global namespace
export default {
    isset,
    validatePriceValue,
    validatePriceRange,
    sortByStringValues,
    sortByNumericValues,
    searchString,
    nomalizeSearchString,
};
