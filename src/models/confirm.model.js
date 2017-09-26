module.exports = function (app) {
    const confirm = {
        id:         '/Confirm',
        type:       'object',
        properties: {
            id:         {type: 'string'},
            donationId: {type: 'string'}
        },
        required:   ['id']
    };

    return confirm;
};