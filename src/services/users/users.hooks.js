const {authenticate}    = require('feathers-authentication').hooks;
const commonHooks       = require('feathers-hooks-common');
const {restrictToOwner} = require('feathers-authentication-hooks');
const {disallow}        = require('feathers-hooks-common');
const {hashPassword}    = require('feathers-authentication-local').hooks;
const restrict          = [
    authenticate('jwt'),
    restrictToOwner({
        idField:    'id',
        ownerField: 'id'
    })
];

const validateUser = require('../../hooks/validate-user');

module.exports = {
    before: {
        all:    [],
        find:   [disallow('external'), authenticate('jwt')],
        get:    [...restrict],
        create: [disallow('external'), hashPassword(), validateUser()],
        update: [disallow('external'), ...restrict, hashPassword(), validateUser()],
        patch:  [disallow('external'), ...restrict, hashPassword(), validateUser()],
        remove: [disallow('external'), ...restrict]
    },

    after: {
        all:    [
            commonHooks.when(
                hook => hook.params.provider,
                commonHooks.discard('password')
            )
        ],
        find:   [],
        get:    [],
        create: [],
        update: [],
        patch:  [],
        remove: []
    },

    error: {
        all:    [],
        find:   [],
        get:    [],
        create: [],
        update: [],
        patch:  [],
        remove: []
    }
};
