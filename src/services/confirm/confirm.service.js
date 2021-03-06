// Initializes the `confirm` service on path `/confirm`
const createService = require('feathers-levelup');
const hooks         = require('./confirm.hooks');
const filters       = require('./confirm.filters');

module.exports = function () {
    const app      = this;
    const paginate = app.get('paginate');

    const options = {
        db:        app.get('levelupDb').sublevel('confirms'),
        sortField: '_createdAt',
        paginate
    };

    // Initialize our service with any options it requires
    const Service = createService(options);
    Service.id    = 'id';
    app.use('/confirm', Service);

    // Get our initialized service so that we can register hooks and filters
    const service = app.service('confirm');

    service.hooks(hooks);

    if (service.filter) {
        service.filter(filters);
    }
};
