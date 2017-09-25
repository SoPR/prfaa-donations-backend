// donationOffer-model.js - A jsonschema model

module.exports = function (app) {
    const donationOffer = {
        id:         '/DonationOffer',
        type:       'object',
        properties: {
            email:  {type: 'string'},
            offers: {type: 'array', items: {type: 'string'}},
            state:  {type: 'string'}
        },
        required:   ['email', 'state']
    };

    return donationOffer;
};