// Helpers
// ----------------------

const validatePriceValue = (value: string, lowerBound: number, upperBound: number) => {
    const price = +value;

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

export default {
    validatePriceValue,
    validatePriceRange,
};
