const validatDonationOffer  = require('../../hooks/validate-donation-offer');
const setDonationFields     = require('../../hooks/set-donation-create-fields');
const sendEmailConfirmation = require('../../hooks/send-email-confirmation');
const updateConfirmation    = require('../../hooks/update-confirmation');

module.exports = {
    before: {
        all:    [],
        find:   [],
        get:    [],
        create: [validatDonationOffer(), setDonationFields()],
        update: [validatDonationOffer()],
        patch:  [],
        remove: []
    },

    after: {
        all:    [],
        find:   [],
        get:    [],
        create: [updateConfirmation(), sendEmailConfirmation()],
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
