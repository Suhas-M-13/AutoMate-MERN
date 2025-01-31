import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"

import { mailtrapClient, sender } from "./mailtrap.config.js"

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        })

        // console.log("Email sent successfully ", response);

    } catch (error) {
        // console.error(`Error in verifying email ${error}`);
        throw new Error(`Error in verifying email ${error}`)
    }
}

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }]

    try {

        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "c9de4534-7233-4d61-87e7-bfe8efc017cb",
            template_variables: {
                "company_info_name": "Maestro Company",
                "name": name
            }
        })

        // console.log("Welcome Email sent successfully ", response);

    } catch (error) {
        // console.error(`Error in sending welcome email ${error}`);
        throw new Error(`Error in sending welcome email ${error}`)
    }
}

export const sendPasswordResetEmail = async(email,resetUrl)=>{
    const recipient = [{email}]

    try {
        const response = await mailtrapClient.send({
            from : sender,
            to : recipient,
            subject : "Reset your password",
            html : PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetUrl),
            category : "Password Reset"
        })

        // console.log("Email sent successfully ", response);
        // console.log("endpoint is  : ", resetUrl);
    } catch (error) {
        // console.error(`Error in sending reset email ${error}`);
        throw new Error(`Error in sending reset email ${error}`)
    }
}

export const sendResetSuccessfullEmail = async(email)=>{
    const recipient = [{email}]

    try {
        const response = await mailtrapClient.send({
            from : sender,
            to : recipient,
            subject : "Password reset Succesfully",
            html : PASSWORD_RESET_SUCCESS_TEMPLATE,
            category : "Password Reset"
        })

        // console.log("Email sent successfully ", response);
    } catch (error) {
        // console.error(`Error in sending reset email ${error}`);
        throw new Error(`Error in sending reset email ${error}`)
    }
}