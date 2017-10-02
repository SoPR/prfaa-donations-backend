// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const jsonschemaValidator = require('jsonschema').Validator;
const v                   = new jsonschemaValidator();
const userModel           = require('../models/user.model');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
    return function validateUser(hook) {
        return new Promise((rsv, rej) => {
            const data = hook.data;
            delete data.force;

            const validate = v.validate(data, userModel);
            if (!validate.valid) {
                return rej(new Error('Invalid data:', JSON.stringify(validate.errors)));
            }

            return rsv(hook);
        });
    };
};
