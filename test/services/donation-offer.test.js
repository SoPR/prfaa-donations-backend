const assert = require('assert');
const app    = require('../../src/app');

describe('\'donationOffer\' service', () => {
    it('registered the service', () => {
        const service = app.service('donation-offer');

        assert.ok(service, 'Registered the service');
    });
});
