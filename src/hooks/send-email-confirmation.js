// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const fs        = require('fs');
const hogan     = require('hogan.js');
const templates = {
    html: fs.readFileSync('src/templates/email-confirmation-html.hogan', 'utf8'),
    text: fs.readFileSync('src/templates/email-confirmation-text.hogan', 'utf8'),
    partials: {
        'body-open': fs.readFileSync('src/templates/partials/email-body-open.hogan', 'utf8'),
        'body-close': fs.readFileSync('src/templates/partials/email-body-close.hogan', 'utf8'),
        'footer': fs.readFileSync('src/templates/partials/email-footer.hogan', 'utf8'),
        'header': fs.readFileSync('src/templates/partials/email-header.hogan', 'utf8'),
        'social-contact': fs.readFileSync('src/templates/partials/email-social-contact.hogan', 'utf8'),
        'styles': fs.readFileSync('src/templates/partials/email-styles.hogan', 'utf8'),
    }
}

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
    return function sendEmailConfirmation(hook) {
        return new Promise((rsv, rej) => {
            const app              = hook.app;
            const transporter      = app.get('nodemailerService');
            const fromEmail        = app.get('fromEmail');
            const testToEmail      = app.get('testToEmail');
            const confirmationLink = app.get('frontendUrl') + '/confirm?id=';
            const htmlEmail        = hogan.compile(templates.html);
            const textEmail        = hogan.compile(templates.text);
            const context          = Object.assign({confirmationLink: confirmationLink}, hook.data);

            transporter.sendMail({
                from:    fromEmail,
                to:      testToEmail || context.email,
                subject: 'Please confirm your donation offer to aid Puerto Rico',
                text:    textEmail.render(context, templates.partials),
                html:    htmlEmail.render(context, templates.partials),
                ses:     {
                    Tags: [{
                        Name:  'type',
                        Value: 'confirmation'
                    }]
                }
            }, (err) => {
                if (err) {
                    return rej(new Error('env:' + process.env.NODE_ENV + ' ' + JSON.stringify(err)));
                }

                return rsv(hook);
            });
        });
    };
};
