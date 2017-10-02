const donationOffer = require('../models/donation-offer.model')();

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
    return function queryDonationOffer(hook) {
        const query      = hook.params.query;
        const isAccepted = query.isAccepted === 'true';
        // Specifying isAccepted=true in the query string forces accepted donation offers to be returned

        if (query.$search) {
            const search      = query.$search;
            const ignoredKeys = ['confirmationCode', '_createdAt', 'id'];

            query.$search = [];
            Object.keys(donationOffer.properties).forEach(doKey => {
                if (!ignoredKeys.includes(doKey)) {
                    query.$search.push({[doKey]: {$like: search}});
                }
            });
            Object.keys(query).forEach(qKey => {
                if (qKey.charAt(0) !== '$') {
                    delete query[qKey];
                }
            });
        }
        else {
            Object.keys(query).forEach(key => {
                if (key.charAt(0) !== '$') {
                    query[key] = {$like: query[key]};
                }
            });
        }

        query.isAccepted = isAccepted;

        return Promise.resolve(hook);
    };
};
