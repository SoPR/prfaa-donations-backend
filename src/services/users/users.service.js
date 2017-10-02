// Initializes the `users` service on path `/users`
const createService = require('feathers-levelup');
const hooks         = require('./users.hooks');
const filters       = require('./users.filters');

module.exports = function () {
    const app      = this;
    const paginate = app.get('paginate');

    const options = {
        db:        app.get('levelupDb').sublevel('users'),
        sortField: '_createdAt',
        paginate
    };

    // Initialize our service with any options it requires
    const Service = createService(options);
    Service.id    = 'id';
    app.use('/users', Service);

    // Get our initialized service so that we can register hooks and filters
    const service = app.service('users');

    service.hooks(hooks);

    if (service.filter) {
        service.filter(filters);
    }
};
