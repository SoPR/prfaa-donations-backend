const levelup      = require('levelup');
const DynamoDBDOWN = require('dynamodbdown');

module.exports = function () {
    const app     = this;
    const config  = app.get('levelup');
    const options = config.options;

    if (options.dynamodb) {
        options.db = DynamoDBDOWN;
    }

    const db = levelup(config.tableName, config.options);

    app.set('levelupDb', db);
};
