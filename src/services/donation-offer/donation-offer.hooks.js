const validatDonationOffer  = require('../../hooks/validate-donation-offer');
const setDonationFields     = require('../../hooks/set-donation-create-fields');
const sendEmailConfirmation = require('../../hooks/send-email-confirmation');
const updateConfirmation    = require('../../hooks/update-confirmation');
const queryDonationOffer    = require('../../hooks/query-donation-offer');
const acceptOffer           = require('../../hooks/accept-offer');
const {authenticate}        = require('feathers-authentication').hooks;

module.exports = {
    before: {
        all:    [],
        find:   [authenticate('jwt'), queryDonationOffer()],
        get:    [authenticate('jwt')],
        create: [validatDonationOffer(), setDonationFields()],
        update: [authenticate('jwt'), validatDonationOffer(), acceptOffer()],
        patch:  [authenticate('jwt'), acceptOffer()],
        remove: [authenticate('jwt')]
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
