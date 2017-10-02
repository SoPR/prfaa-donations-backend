const donationOffer = require('./donation-offer/donation-offer.service.js');
const confirm       = require('./confirm/confirm.service.js');
const users         = require('./users/users.service.js');
module.exports      = function () {
    const app = this; // eslint-disable-line no-unused-vars
    app.configure(donationOffer);
    app.configure(confirm);
    app.configure(users);
};
