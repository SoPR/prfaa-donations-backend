// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
    return function acceptOffer(hook) {
        const data = hook.data;

        if (data.acceptedBy) {
            data.isAccepted   = true;
            data.acceptedDate = new Date();
        }

        return Promise.resolve(hook);
    };
};
