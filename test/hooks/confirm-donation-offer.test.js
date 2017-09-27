const assert               = require('assert');
const confirmDonationOffer = require('../../src/hooks/confirm-donation-offer');

describe('\'confirmDonationOffer\' hook', () => {
    it('runs the hook', () => {
        // A mock hook object
        const mockOffer = {
            email:       'user@example.com',
            isConfirmed: false,
            id:          '1506380088325:0:8a40ed47-8ba1-4dd4-8864-4b464fc05851'
        };
        const mock      = {
            app:    {
                service: () => ({
                    get:   () => Promise.resolve(mockOffer),
                    patch: (id, keysToUpdate) => {
                        if (id === mockOffer.id) {
                            const mockOfferUpdate = Object.assign(mockOffer, keysToUpdate);
                            if ((!mockOfferUpdate.isConfirmed) || (mockOfferUpdate.isVerified)) {
                                return Promise.reject(new Error('incorrect keys set'));
                            }

                            return Promise.resolve(mockOfferUpdate);
                        }
                        else {
                            return Promise.reject(new Error('incorrect settings'));
                        }
                    }
                })
            },
            result: {
                donationId: '1506380088325:0:8a40ed47-8ba1-4dd4-8864-4b464fc05851'
            }
        };
        // Initialize our hook with no options
        const hook      = confirmDonationOffer();

        // Run the hook function (which returns a promise)
        // and compare the resulting hook object
        return hook(mock).then(result => {
            assert.equal(result, mock, 'Returns the expected hook object');
        });
    });
})
;
