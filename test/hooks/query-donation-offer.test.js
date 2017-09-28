const assert             = require('assert');
const queryDonationOffer = require('../../src/hooks/query-donation-offer');

describe('\'queryDonationOffer\' hook', () => {
    it('runs the hook', () => {
        // A mock hook object
        const mock = {
            params: {
                query: {}
            }
        };
        // Initialize our hook with no options
        const hook = queryDonationOffer();

        // Run the hook function (which returns a promise)
        // and compare the resulting hook object
        return hook(mock).then(result => {
            assert.equal(result, mock, 'Returns the expected hook object');
        });
    });
});
