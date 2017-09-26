const validateConfirm = require('../../hooks/validate-confirm');

const confirmDonationOffer = require('../../hooks/confirm-donation-offer');

module.exports = {
    before: {
        all:    [],
        find:   [],
        get:    [],
        create: [validateConfirm()],
        update: [],
        patch:  [],
        remove: []
    },

    after: {
        all:    [],
        find:   [],
        get:    [confirmDonationOffer()],
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
