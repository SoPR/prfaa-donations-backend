// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const validator = require('validator');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
    return function validateDonationOffer(hook) {
        return new Promise((rsv, rej) => {
            const data = hook.data;
            if (data.email && !validator.isEmail(data.email)) {
                return rej(new Error('Invalid email'));
            }
            return rsv(hook);
        });
    };
};
