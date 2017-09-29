module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
    return function setDonationState(hook) {
        return new Promise((rsv, rej) => {
            const app            = hook.app;
            const data           = hook.data;
            const confirmService = app.service('confirm');

            data.isConfirmed = false;
            delete data.isVerified;
            delete data.isAccepted;
            delete data.acceptedBy;
            delete data.acceptedDate;

            confirmService.create({})
                .then((confirmation) => {
                    data.confirmationCode = confirmation.id;
                    return rsv(hook);
                })
                .catch(rej);
        });
    };
};
