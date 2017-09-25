const donationOffer = require('./donation-offer/donation-offer.service.js');
module.exports      = function () {
    const app = this; // eslint-disable-line no-unused-vars
    app.configure(donationOffer);
};
