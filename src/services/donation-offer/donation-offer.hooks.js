const validatDonationOffer = require('../../hooks/validate-donation-offer');

const setDonationState = require('../../hooks/set-donation-state');

module.exports = {
    before: {
        all:    [],
        find:   [],
        get:    [],
        create: [validatDonationOffer(), setDonationState()],
        update: [validatDonationOffer()],
        patch:  [],
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
