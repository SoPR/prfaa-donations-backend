module.exports = function (app) {
    const user = {
        id:         '/User',
        type:       'object',
        properties: {
            id:       {type: 'string'},
            username: {type: 'string'},
            password: {type: 'string'},
            role:     {type: 'string'}
        },
        required:   ['id', 'username', 'password', 'role']
    };

    return user;
};