import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});

export const sendOtp = async (email, otp, type = 'signup') => {
    const subject =
        type === 'reset'
            ? "Reset Your Password - Authentication System"
            : "Verification Code - Authentication System";

    const message =
        type === 'reset'
            ? `We received a request to reset your password. Use the code below to continue.`
            : `Please verify your account using the code below.`;

    const label = type === 'reset'
        ? 'Password Reset Code'
        : 'Verification Code';

    const html = `
        <p>${message}</p>

        <p><strong>${label}:</strong></p>
        <h2>${otp}</h2>

        <p>How to use this code:</p>
        <ul>
            <li>Copy the 6-digit code above</li>
            <li>Return to the login/verification page</li>
            <li>Enter the code in the verification field</li>
        </ul>

        <p><strong>Note:</strong> This code will expire in 10 minutes.</p>

        <p>— Authentication System</p>
    `;

    await transporter.sendMail({
        from: `"Authentication System" <${process.env.EMAIL_USER}>`,
        to: email,
        subject,
        html
    });
};
