// Initializes the `donationOffer` service on path `/donation-offer`
const createService = require('feathers-levelup');
const hooks         = require('./donation-offer.hooks');
const filters       = require('./donation-offer.filters');

module.exports = function () {
    const app      = this;
    const paginate = app.get('paginate');

    const options = {
        db:        app.get('levelupDb'),
        sortField: '_createdAt',
        paginate
    };

    // Initialize our service with any options it requires
    app.use('/donation-offer', createService(options));

    // Get our initialized service so that we can register hooks and filters
    const service = app.service('donation-offer');

    service.hooks(hooks);

    if (service.filter) {
        service.filter(filters);
    }
};
