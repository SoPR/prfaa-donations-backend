const assert = require('assert');
const app    = require('../../src/app');

describe('\'confirm\' service', () => {
    it('registered the service', () => {
        const service = app.service('confirm');

        assert.ok(service, 'Registered the service');
    });
});
