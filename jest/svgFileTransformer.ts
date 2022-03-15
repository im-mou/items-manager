module.exports = {
    process() {
        return 'module.exports = {};';
    },
    getCacheKey() {
        return 'jest-svg-transformer';
    },
};
