// donationOffer-model.js - A jsonschema model

module.exports = function (app) {
    const donationOffer = {
        id:         '/DonationOffer',
        type:       'object',
        properties: {
            id:                  {type: 'string'},
            fullname:            {type: 'string'},
            organizationType:    {type: 'string', enum: ['individual', 'corporation', 'ngo']},
            organizationName:    {type: 'string'},
            phoneNumber:         {type: 'string'},
            email:               {type: 'string'},
            donationCategory:    {
                type: 'string',
                enum: ['energy', 'foodWater', 'clothes', 'construction', 'telecommunications', 'transportation', 'search', 'other']
            },
            detailedDescription: {type: 'string'},
            locationOfDonation:  {type: 'string'},
            zipCode:             {type: 'string'},
            transportationNeed:  {type: 'string', enum: ['yes', 'no']},
            transportationType:  {type: 'string', enum: ['land', 'air', 'maritime', 'other']},
            notes:               {type: 'string'},
            isConfirmed:         {type: 'boolean'},
            confirmationCode:    {type: 'string'},
            isAccepted:          {type: 'boolean'},
            acceptedBy:          {type: 'string'},
            acceptedDate:        {type: 'date'}
        },
        required:   ['id', 'email']
    };

    return donationOffer;
};