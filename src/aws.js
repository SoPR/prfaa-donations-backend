const aws = require('aws-sdk');

module.exports = function () {
    const app    = this;
    const config = app.get('aws');

    aws.config.region = 'us-east-1';
    if (config && config.ec2) {
        aws.config.credentials = new aws.EC2MetadataCredentials({
            httpOptions:       {timeout: 5000},
            maxRetries:        10,
            retryDelayOptions: {base: 200}
        });
        app.set('awsService', aws);
    }
    else if (config && config.local) {
        app.set('awsService', aws);
    }
};
