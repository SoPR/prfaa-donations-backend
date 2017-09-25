// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const validator           = require('validator');
const jsonschemaValidator = require('jsonschema').Validator;
const v                   = new jsonschemaValidator();
const donationOfferModel  = require('../models/donation-offer.model');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
    return function validateDonationOffer(hook) {
        return new Promise((rsv, rej) => {
            const data = hook.data;
            if (!validator.isEmail(data.email)) {
                return rej(new Error('Invalid email'));
            }

            const validate = v.validate(data, donationOfferModel);

            if (!validate.valid) {
                return rej(new Error('Invalid data:', JSON.stringify(validate.errors)));
            }

            return rsv(hook);
        });
    };
};
