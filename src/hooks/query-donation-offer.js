const levelQuery = require('level-query');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
    return function queryDonationOffer(hook) {
        const query = hook.params.query;
        Object.keys(query).forEach(key => query[key] = {$like: query[key]});
        return Promise.resolve(hook);
    };
};
