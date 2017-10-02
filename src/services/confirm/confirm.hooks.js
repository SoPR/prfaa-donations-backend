const validateConfirm      = require('../../hooks/validate-confirm');
const confirmDonationOffer = require('../../hooks/confirm-donation-offer');
const sendEmailThankyou    = require('../../hooks/send-email-thankyou');
const {disallow}           = require('feathers-hooks-common');

module.exports = {
    before: {
        all:    [],
        find:   [disallow],
        get:    [],
        create: [validateConfirm()],
        update: [],
        patch:  [disallow],
        remove: [disallow]
    },

    after: {
        all:    [],
        find:   [],
        get:    [confirmDonationOffer(), sendEmailThankyou()],
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
