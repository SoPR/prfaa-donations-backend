// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
    return function updateConfirmation(hook) {
        return new Promise((rsv, rej) => {
            const app            = hook.app;
            const confirmService = app.service('confirm');
            const offer          = hook.result;

            confirmService.update(offer.confirmationCode, {donationId: offer.id})
                .then(() => {
                    return rsv(hook);
                })
                .catch(rej);
        });
    };
};
