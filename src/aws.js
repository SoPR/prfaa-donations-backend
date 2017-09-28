const aws = require('aws-sdk');

module.exports = function () {
    const app = this;

    if (aws.config && aws.config.credentials && aws.config.credentials.accessKeyId) {
        app.set('awsService', aws);
    }
};
