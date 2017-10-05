// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
    return function confirmDonationOffer(hook) {
        return new Promise((rsv, rej) => {
            const app                  = hook.app;
            const donationOfferService = app.service('donation-offer');
            const confirm              = hook.result;

            donationOfferService.get(confirm.donationId)
                .then((donationOffer) => {
                    if (!donationOffer.isConfirmed) {
                        donationOfferService.patch(confirm.donationId, {isConfirmed: true})
                            .then((donationOffer) => {
                                confirm.donationOffer = donationOffer;
                                return rsv(hook);
                            })
                            .catch(rej);
                    }
                    else {
                        return rsv(hook);
                    }
                });
        });
    };
};
