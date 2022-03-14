// Global constants
// ----------------------

// Pagination
export const ITEMS_PER_PAGE = 5;

// search filter
export const PRICE_MIN_VALUE = 0;
export const PRICE_MAX_VALUE = 1000000000;

// Order by list
export const ORDER_BY_KEYS = ['title', 'description', 'price', 'email'] as const;

// Error messages
export const ERRORS = {
    priceRange: {
        invalidValue: 'invalid value',
        missingValue: 'must must have value',
        rangeNotValid: 'must be greater than minimum price',
    },
};
