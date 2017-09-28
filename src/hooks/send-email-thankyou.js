const fs    = require('fs');
const hogan = require('hogan.js');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
    return function sendEmailThankyou(hook) {
        return new Promise((rsv, rej) => {
            if (!hook.result.donationOffer) {
                return rsv(hook);
            }

            fs.readFile('src/templates/email-thankyou-html.hogan', (err, htmlTemplate) => {
                if (err) {
                    return rej(err);
                }
                fs.readFile('src/templates/email-thankyou-text.hogan', (err, textTemplate) => {
                    if (err) {
                        return rej(err);
                    }

                    const app         = hook.app;
                    const transporter = app.get('nodemailerService');
                    const fromEmail   = app.get('fromEmail');
                    const testToEmail = app.get('testToEmail');
                    const htmlEmail   = hogan.compile(htmlTemplate.toString());
                    const textEmail   = hogan.compile(textTemplate.toString());
                    const context     = hook.result.donationOffer;

                    transporter.sendMail({
                        from:    fromEmail,
                        to:      testToEmail || context.email,
                        subject: 'Thank you for confirming your donation offer',
                        text:    textEmail.render(context),
                        html:    htmlEmail.render(context),
                        ses:     {
                            Tags: [{
                                Name:  'type',
                                Value: 'thankyou'
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
