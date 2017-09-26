// donationOffer-model.js - A jsonschema model

module.exports = function (app) {
    const donationOffer = {
        id:         '/DonationOffer',
        type:       'object',
        properties: {
            id:               {type: 'string'},
            email:            {type: 'string'},
            offers:           {type: 'array', items: {type: 'string'}},
            isConfirmed:      {type: 'boolean'},
            isVerified:       {type: 'boolean'},
            confirmationCode: {type: 'string'}
        },
        required:   ['id', 'email']
    };

    return donationOffer;
};