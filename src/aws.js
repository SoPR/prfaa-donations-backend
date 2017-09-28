const aws = require('aws-sdk');

module.exports = function () {
    const app = this;

    console.log(aws.config.credentials);
    if (aws.config && aws.config.credentials) {
        aws.config.update({region:'us-east-1'});
        app.set('awsService', aws);
    }
};
