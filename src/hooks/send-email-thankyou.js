const fs        = require('fs');
const hogan     = require('hogan.js');
const templates = {
    html: fs.readFileSync('src/templates/email-thankyou-html.hogan', 'utf8'),
    text: fs.readFileSync('src/templates/email-thankyou-text.hogan', 'utf8'),
    partials: {
      'body-close': fs.readFileSync('src/templates/partials/email-body-close.hogan', 'utf8'),
      'body-open': fs.readFileSync('src/templates/partials/email-body-open.hogan', 'utf8'),
      'footer': fs.readFileSync('src/templates/partials/email-footer.hogan', 'utf8'),
      'header': fs.readFileSync('src/templates/partials/email-header.hogan', 'utf8'),
      'social-contact': fs.readFileSync('src/templates/partials/email-social-contact.hogan', 'utf8'),
      'styles': fs.readFileSync('src/templates/partials/email-styles.hogan', 'utf8'),
    },
}

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
    return function sendEmailThankyou(hook) {
        return new Promise((rsv, rej) => {
            if (!hook.result.donationOffer) {
                return rsv(hook);
            }

            const app         = hook.app;
            const transporter = app.get('nodemailerService');
            const fromEmail   = app.get('fromEmail');
            const testToEmail = app.get('testToEmail');
            const htmlEmail   = hogan.compile(templates.html);
            const textEmail   = hogan.compile(templates.text);
            const context     = hook.result.donationOffer;

            transporter.sendMail({
                from:    fromEmail,
                to:      testToEmail || context.email,
                subject: 'Thank you for confirming your donation offer',
                text:    textEmail.render(context, templates.partials),
                html:    htmlEmail.render(context, templates.partials),
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
    };
};
