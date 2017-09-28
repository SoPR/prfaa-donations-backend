const aws = require('aws-sdk');

module.exports = function () {
    const app = this;

    if (aws.config && aws.config.credentials && aws.config.credentials.accessKeyId) {
        aws.config.update({region:'us-east-1'});
        app.set('awsService', aws);
    }
};
