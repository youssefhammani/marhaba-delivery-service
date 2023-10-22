const nodemailer = require('nodemailer');
const config = require('../../config/config');


// const transporter = nodemailer.createTransport({
//     service: 'YourEmailService',
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     },
// });

const emailTemplates = (name, email, token) => {
    return `
      <h1>Hi Dear ${name}</h1>
      <p>Thank you for registering on our site.</p>
      <p>Click the link below to activate your account</p>
      <a href="http://localhost:3000/api/auth/activationEmail/${email}/${token}">Activate</a>
    `;
}

const passwordResetTemplate = (name, token) => {
    return `
      <h1>Hi Dear ${name}</h1>
      <p>If you didn't request a password reset, you can ignore this email or contact us to report it. Your account is safe.</p>
      <p>Here is your password reset code: ${token}</p>
    `;
}

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

const sendConfirmationEmail = (name, userEmail, token, templateFunction) => {
    const mailOptions = {
        from: 'contact@marhabadeliveryservice.ma', // Your email address
        to: userEmail,
        subject: 'Token Expiration Confirmation ✔',
        text: `Your token is about to expire in 10 minutes. Click the following link to confirm: ${process.env.BASE_URL}/confirm?token=${token}`,
        html: templateFunction(name, userEmail, token),
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Email send error: ' + error);
        } else {
            console.log('Email sent: ' + info.response);
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        }
    });
};


module.exports = { sendConfirmationEmail, emailTemplates, passwordResetTemplate };
