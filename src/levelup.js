const levelup      = require('levelup');
const sublevel     = require('level-sublevel');
const DynamoDBDOWN = require('dynamodbdown');

module.exports = function () {
    const app     = this;
    const config  = app.get('levelup');
    const options = config.options;

    if (options.dynamodb) {
        options.db = DynamoDBDOWN;
    }

    const db = sublevel(levelup(config.tableName, config.options));

    app.set('levelupDb', db);
};
