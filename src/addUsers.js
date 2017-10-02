const logger = require('winston');

module.exports = function () {
    const app          = this;
    const usersService = app.service('users');

    function getSecureFile() {
        return new Promise((rsv, rej) => {
            const secureConfig = app.get('secureConfig');

            if (secureConfig.type === 'local') {
                const fs = require('fs');
                return rsv(fs.readFileSync(secureConfig.path));
            }
            else if (secureConfig.type === 's3') {
                const aws = app.get('awsService');
                const s3  = new aws.S3();
                s3.getObject({Bucket: secureConfig.bucket, Key: secureConfig.path}, (err, data) => {
                    if (err) {
                        return rej(err);
                    }
                    return rsv(data.Body.toString());
                });
            }
        });
    }

    function addMissingUsers(usersToAdd) {
        if (usersToAdd.length) {
            usersToAdd.forEach((user) => {
                usersService.create(user)
                    .then(() => logger.info('Added user.'))
                    .catch((err) => {
                        throw err;
                    });
            });
        }
        else {
            logger.info('All users already exist.');
        }
    }

    getSecureFile()
        .then((secureFileRaw) => {
            const secureFile = JSON.parse(secureFileRaw);
            const users      = secureFile.users;

            usersService.find({})
                .then((dbUsersResponse) => {
                    const dbUsers   = dbUsersResponse.data;
                    let usersToAdd  = [];
                    let usersToDrop = [];

                    // If a new user is found in the secure file, add them
                    //  or if "force":true is set on a user, remove them and recreate them
                    users.forEach((user) => {
                        const haveUser = dbUsers.some((dbUser) => dbUser.username === user.username);
                        if (!haveUser) {
                            usersToAdd.push(user);
                        }
                        else if (user.force) {
                            usersToAdd.push(user);
                            dbUsers.some((dbUser) => {
                                if (dbUser.username === user.username) {
                                    usersToDrop.push(dbUser);
                                    return true;
                                }
                            });
                        }
                    });

                    // If a user is in the db and *not* in the secure file, remove them
                    dbUsers.forEach((dbUser) => {
                        const userRemoved = users.every((user) => dbUser.username !== user.username);
                        if (userRemoved) {
                            usersToDrop.push(dbUser);
                        }
                    });

                    if (usersToDrop.length) {
                        logger.info('Removing %d user(s)', usersToDrop.length);
                        Promise
                            .all(usersToDrop.map((user) => usersService.remove(user.id)))
                            .then(() => addMissingUsers(usersToAdd))
                            .catch(err => {
                                throw err;
                            });
                    }
                    else {
                        return addMissingUsers(usersToAdd);
                    }
                })
                .catch(err => {
                    throw err;
                });
        })
        .catch((err) => {
            throw err;
        });
};
