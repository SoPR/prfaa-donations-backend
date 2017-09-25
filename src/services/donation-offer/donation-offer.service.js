// Initializes the `donationOffer` service on path `/donation-offer`
const createService = require('feathers-mongoose');
const createModel   = require('../../models/donation-offer.model');
const hooks         = require('./donation-offer.hooks');
const filters       = require('./donation-offer.filters');

module.exports = function () {
    const app      = this;
    const Model    = createModel(app);
    const paginate = app.get('paginate');

    const options = {
        name: 'donation-offer',
        Model,
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
