// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const fs    = require('fs');
const hogan = require('hogan.js');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
    return function sendEmailConfirmation(hook) {
        return new Promise((rsv, rej) => {
            fs.readFile('src/templates/email-confirmation-html.hogan', (err, htmlTemplate) => {
                if (err) {
                    return rej(err);
                }
                fs.readFile('src/templates/email-confirmation-text.hogan', (err, textTemplate) => {
                    if (err) {
                        return rej(err);
                    }

                    const app              = hook.app;
                    const transporter      = app.get('nodemailerService');
                    const confirmationLink = app.get('linksUrl') + '/confirm?id=';
                    const htmlEmail        = hogan.compile(htmlTemplate.toString());
                    const textEmail        = hogan.compile(textTemplate.toString());
                    const context          = Object.assign({confirmationLink: confirmationLink}, hook.data);

                    transporter.sendMail({
                        from:    'prfaa@example.com',
                        to:      context.email,
                        subject: 'Please confirm your donation offer to aid Puerto Rico',
                        text:    textEmail.render(context),
                        html:    htmlEmail.render(context),
                        ses:     {
                            Tags: [{
                                Name:  'type',
                                Value: 'confirmation'
                            }]
                        }
                    }, (err) => {
                        if (err) {
                            return rej(err);
                        }

                        return rsv(hook);
                    });
                });
            });
        });
    };
};
