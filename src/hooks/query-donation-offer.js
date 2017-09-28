const donationOffer = require('../models/donation-offer.model')();

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
    return function queryDonationOffer(hook) {
        const query = hook.params.query;

        if (query.$search) {
            const search = query.$search;
            const ignoredKeys = ['confirmationCode', '_createdAt', 'id'];

            query.$search = [];
            Object.keys(donationOffer.properties).forEach(doKey => {
                if (!ignoredKeys.includes(doKey)) {
                    query.$search.push({[doKey]: {$like: search}});
                }
            });
            Object.keys(query).forEach(qKey => {
                if (qKey !== '$search') {
                    delete query[qKey];
                }
            });
        }
        else {
            Object.keys(query).forEach(key => query[key] = {$like: query[key]});
        }

        return Promise.resolve(hook);
    };
};
