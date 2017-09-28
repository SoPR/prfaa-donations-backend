const aws = require('aws-sdk');

module.exports = function () {
    const app    = this;
    const config = app.get('aws');

    if (config && config.ec2) {
        aws.config.credentials = new aws.EC2MetadataCredentials({
            region:            'us-east-1',
            httpOptions:       {timeout: 5000},
            maxRetries:        10,
            retryDelayOptions: {base: 200}
        });
        app.set('awsService', aws);
    }
};
