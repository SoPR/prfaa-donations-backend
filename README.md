# Config
Modify `default.json` for your current desired configuration settings.

### Key: `"levelup"`
#### Subkey: `"store"`
Set to `"dynamodb"` if desired to use AWS dynamodb. *Requires* `"aws"` key info to work properly.


### Key: `"nodemailer"`
#### Subkey: `"method"`
Set to `"SES"` if desired to use AWS Simple Email Service. *Requires* `"aws"` key info to work properly.

#### Subkey: `"options"`
Options specific to the method used for sending email.
`"SES"` requires `"sendingRate"`
`"SMTP"` requires `"host"`, `"port"`, `"secure"`, `"auth.user"`, and `"auth.path"`
See [NodeMailer Docs](https://nodemailer.com/) for more info.


### Key: `"aws"`
Must be defined to use AWS resources.
#### Subkey: `"credentials"`
Set to `"file"` if loading credentials from `~/.aws/credentials`
Set to `"iam"` if loading credentials from the IAM assigned to the running EC2 instance (default for production).


### Key: `"fromEmail"`
Email address as the "from" in generated emails


### Key: `"testToEmail"`
Force all emails to be sent to this address, ignoring the email address the correspondence would normally go to, e.g., the email address on the submitted donation form.

---
MIT License
Copyright (c) 2017 Startups of Puerto Rico

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.