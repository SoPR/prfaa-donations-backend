const assert                = require('assert');
const sendEmailConfirmation = require('../../src/hooks/send-email-confirmation');

describe('\'sendEmailConfirmation\' hook', () => {
    it('runs the hook', () => {
        // A mock hook object
        const mock = {
            app:  {
                get: (name) => {
                    switch (name) {
                    case 'nodemailerService':
                        return {
                            sendMail: (obj, cb) => {
                                return cb();
                            }
                        };
                        break;
                    case 'frontendUrl':
                        return;
                        break;
                    }
                },
            },
            data: {}
        };
        // Initialize our hook with no options
        const hook = sendEmailConfirmation();

        // Run the hook function (which returns a promise)
        // and compare the resulting hook object
        return hook(mock).then(result => {
            assert.equal(result, mock, 'Returns the expected hook object');
        });
    });
});
