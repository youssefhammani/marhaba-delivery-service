const nodemailer = require('nodemailer');
const config = require('../../config/config');


// const transporter = nodemailer.createTransport({
//     service: 'YourEmailService',
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     },
// });

const emailTemplates = (name, token) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Registration Confirmation</title>
        </head>
        <body>
            <p><strong>Registration Confirmation</strong></p>
            <p>Hello ${name},</p>
            <p>Welcome to Marhaba Delivery Service! Your registration has been successfully completed. To get started, please click the link below to confirm your email address:</p>
            <p><a href="http://localhost:5173/confirm-email/${token}">Confirmation Link</a></p>
            <p>If you did not create this account, please ignore this email or contact our support team immediately.</p>
            <p>We're thrilled to have you as part of our community. If you have any questions or need assistance, feel free to reach out to our support team at <a href="mailto:contact@marhabadeliveryservice.ma">contact@marhabadeliveryservice.ma</a>.</p>
            <p>Thank you for choosing Marhaba Delivery Service.</p>
            <p><strong>Best regards, <br>Marhaba Delivery Service Support Team</strong></p>
        </body>
        </html>
    `;
}

const passwordResetTemplate = (name, token) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Password Recovery Request Received</title>
        </head>
        <body>
            <p><strong>Password Recovery Request Received</strong></p>
            <p>Hello ${name},</p>
            <p>We have received your request to reset your password for your Marhaba Delivery Service account. To continue with the password reset process, please click the link below:</p>
            <p><a href="http://localhost:5173/reset-password/${token}">Password Reset Link</a></p>
            <p>Please note that this link is valid for the next 15 minutes. If you did not request this password reset, please ignore this email or contact our support team.</p>
            <p>If you encounter any issues or need further assistance, please don't hesitate to contact our support team at <a href="mailto:contact@marhabadeliveryservice.ma">Support Email Address</a>.</p>
            <p>Thank you for choosing Marhaba Delivery Service.</p>
            <p><strong>Best regards, <br>Marhaba Delivery Service Support Team</strong></p>
        </body>
        </html>
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

const sendConfirmationEmail = (name, userEmail, subject, token, templateFunction) => {
    const mailOptions = {
        from: 'contact@marhabadeliveryservice.ma', // Your email address
        to: userEmail,
        subject: subject,
        text: `Your token is about to expire in 10 minutes. Click the following link to confirm: ${process.env.BASE_URL}/confirm?token=${token}`,
        html: templateFunction(name, token),
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
