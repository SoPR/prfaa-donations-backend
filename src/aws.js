const aws = require('aws-sdk');

module.exports = function () {
    const app    = this;
    const config = app.get('aws');

    if (config) {
        aws.config(config);
        app.set('awsService', aws);
    }
};
