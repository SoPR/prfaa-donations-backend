const assert       = require('assert');
const validateUser = require('../../src/hooks/validate-user');

describe('\'validateUser\' hook', () => {
    it('runs the hook', () => {
        // A mock hook object
        const mock = {
            data: {
                username: 'testuser',
                password: 'testpassword',
                role:     'api'
            }
        };    // Initialize our hook with no options
        const hook = validateUser();

        // Run the hook function (which returns a promise)
        // and compare the resulting hook object
        return hook(mock).then(result => {
            assert.equal(result, mock, 'Returns the expected hook object');
        });
    });
});
