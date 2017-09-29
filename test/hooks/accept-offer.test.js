const assert      = require('assert');
const acceptOffer = require('../../src/hooks/accept-offer');

describe('\'acceptOffer\' hook', () => {
    it('runs the hook', () => {
        // A mock hook object
        const mock = {
            data: {
                acceptedBy: 'My Name'
            }
        };
        // Initialize our hook with no options
        const hook = acceptOffer();

        // Run the hook function (which returns a promise)
        // and compare the resulting hook object
        return hook(mock).then(result => {
            assert.equal(result.data.isAccepted, true);
            assert.doesNotThrow(() => result.data.acceptedDate.getTime());
        });
    });
});
