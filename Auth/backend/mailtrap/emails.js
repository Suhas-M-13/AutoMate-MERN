import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { transporter, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    try {
        console.log('emial : '+email+"  "+verificationToken);
        
        const response = await transporter.sendMail({
            from: `"${sender.name}" <${sender.email}>`,
            to: email,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
        });

        console.log("Verification Email sent: ", response.messageId);
    } catch (error) {
        console.log('Error : '+error);
        
        throw new Error(`Error in verifying email: ${error}`);
    }
};

export const sendWelcomeEmail = async (email, name) => {
    try {
        const response = await transporter.sendMail({
            from: `"${sender.name}" <${sender.email}>`,
            to: email,
            subject: "Welcome to Maestro Company",
            html: `<p>Hello ${name}, welcome to Maestro Company!</p>`,
        });

        console.log("Welcome Email sent: ", response.messageId);
    } catch (error) {
        throw new Error(`Error in sending welcome email: ${error}`);
    }
};

export const sendPasswordResetEmail = async (email, resetUrl) => {
    try {
        const response = await transporter.sendMail({
            from: `"${sender.name}" <${sender.email}>`,
            to: email,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
        });

        console.log("Password Reset Email sent: ", response.messageId);
    } catch (error) {
        throw new Error(`Error in sending password reset email: ${error}`);
    }
};

export const sendResetSuccessfulEmail = async (email) => {
    try {
        const response = await transporter.sendMail({
            from: `"${sender.name}" <${sender.email}>`,
            to: email,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
        });

        console.log("Password Reset Success Email sent: ", response.messageId);
    } catch (error) {
        throw new Error(`Error in sending reset email: ${error}`);
    }
};
