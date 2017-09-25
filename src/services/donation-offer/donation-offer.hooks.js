const validatDonationOffer = require('../../hooks/validate-donation-offer');

module.exports = {
    before: {
        all:    [],
        find:   [],
        get:    [],
        create: [validatDonationOffer()],
        update: [validatDonationOffer()],
        patch:  [validatDonationOffer()],
        remove: []
    },

    after: {
        all:    [],
        find:   [],
        get:    [],
        create: [],
        update: [],
        patch:  [],
        remove: []
    },

    error: {
        all:    [],
        find:   [],
        get:    [],
        create: [],
        update: [],
        patch:  [],
        remove: []
    }
};
