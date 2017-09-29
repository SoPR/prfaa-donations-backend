const levelup      = require('levelup');
const sublevel     = require('level-sublevel');
const DynamoDBDOWN = require('dynamodbdown');

module.exports = function () {
    const app     = this;
    const config  = app.get('levelup');
    const options = config.options;
    let db        = {};

    if (config.dynamodb) {
        const aws        = app.get('awsService');
        options.db       = DynamoDBDOWN;
        options.dynamodb = aws.config.credentials;
        db               = sublevel(levelup(config.tableName, options));
    }
    else {
        db = sublevel(levelup(config.tableName, options));
    }

    app.set('levelupDb', db);
};
