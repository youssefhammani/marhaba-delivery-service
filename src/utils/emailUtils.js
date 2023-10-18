const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'YourEmailService',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendConfirmationEmail = (userEmail, token) => {
    const mailOptions = {
        from: 'your-email@gmail.com', // Your email address
        to: userEmail,
        subject: 'Token Expiration Confirmation ✔',
        text: `Your token is about to expire in 10 minutes. Click the following link to confirm: ${process.env.BASE_URL}/confirm?token=${token}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Email send error: ' + error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

module.exports = { sendConfirmationEmail };
