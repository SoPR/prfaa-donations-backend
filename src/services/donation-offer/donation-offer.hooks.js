const validatDonationOffer  = require('../../hooks/validate-donation-offer');
const setDonationFields     = require('../../hooks/set-donation-create-fields');
const sendEmailConfirmation = require('../../hooks/send-email-confirmation');
const updateConfirmation    = require('../../hooks/update-confirmation');
const queryDonationOffer    = require('../../hooks/query-donation-offer');
const acceptOffer           = require('../../hooks/accept-offer');
const {authenticate}        = require('feathers-authentication').hooks;
const {disallow, when}      = require('feathers-hooks-common');

const adminOnly = [
    authenticate('jwt'),
    when(hook => !hook.params.user || hook.params.user.role !== 'admin', disallow())
];

module.exports = {
    before: {
        all:    [],
        find:   [...adminOnly, queryDonationOffer()],
        get:    [],
        create: [validatDonationOffer(), setDonationFields()],
        update: [validatDonationOffer(), acceptOffer()],
        patch:  [acceptOffer()],
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
