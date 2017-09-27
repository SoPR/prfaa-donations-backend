const assert             = require('assert');
const updateConfirmation = require('../../src/hooks/update-confirmation');

describe('\'updateConfirmation\' hook', () => {
    it('runs the hook', () => {
        // A mock hook object
        const mock = {
            app:    {
                service: () => ({
                    update: () => Promise.resolve()
                })
            },
            result: {confirmationCode: '1506380088325:0:8a40ed47-8ba1-4dd4-8864-4b464fc05851'}
        };
        // Initialize our hook with no options
        const hook = updateConfirmation();

        // Run the hook function (which returns a promise)
        // and compare the resulting hook object
        return hook(mock).then(result => {
            assert.equal(result, mock, 'Returns the expected hook object');
        });
    });
});
