const assert           = require('assert');
const setDonationState = require('../../src/hooks/set-donation-create-fields');

describe('\'setDonationState\' hook', () => {
    it('runs the hook', () => {
        // A mock hook object
        const mockConfirm = {
            id: '1506380088325:0:8a40ed47-8ba1-4dd4-8864-4b464fc05851'
        };
        const mock        = {
            app:  {
                service: () => ({
                    create: () => Promise.resolve(mockConfirm)
                })
            },
            data: {}
        };
        // Initialize our hook with no options
        const hook        = setDonationState();

        // Run the hook function (which returns a promise)
        // and compare the resulting hook object
        return hook(mock).then(result => {
            assert.equal(result, mock, 'Returns the expected hook object');
        });
    });
});
