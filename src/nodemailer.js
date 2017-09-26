const nodemailer = require('nodemailer');

module.exports = function () {
    const app     = this;
    const config  = app.get('nodemailer');
    const options = config.options;

    let transporter = {};

    if (options.SES) {
        const aws   = app.get('awsService');
        transporter = nodemailer.createTransport({
            SES: new aws.SES({
                apiVersion: '2010-12-01'
            })
        });
    }
    else {
        transporter = nodemailer.createTransport(options);
    }

    app.set('nodemailerService', transporter);
};
