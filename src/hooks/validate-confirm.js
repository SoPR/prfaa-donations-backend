// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const jsonschemaValidator = require('jsonschema').Validator;
const v                   = new jsonschemaValidator();
const confirmModel        = require('../models/confirm.model');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
    return function validateConfirm(hook) {
        return new Promise((rsv, rej) => {
            const data     = hook.data;
            const validate = v.validate(data, confirmModel);

            if (!validate.valid) {
                return rej(new Error('Invalid data:', JSON.stringify(validate.errors)));
            }

            return rsv(hook);
        });
    };
};
