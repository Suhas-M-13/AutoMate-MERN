import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, SLOT_BOOKING_EMAIL_TEMPLATE, MECHANIC_NOTIFICATION_EMAIL_TEMPLATE, DAILY_MECHANIC_NOTIFICATION_TEMPLATE } from "./emailTemplates.js";
import { transporter, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    try {
        const response = await transporter.sendMail({
            from: `"${sender.name}" <${sender.email}>`,
            to: email,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
        });
    } catch (error) {
        throw new Error(`Error in verifying email: ${error}`);
    }
};

export const bookingSlotConfirm = async(customerEmail, customerName, mechanicName, bookingDate, bookingTime, garageName, vehicleNumber, mobileNumber) => {
    try {
        // console.log("inside email of slot confirm")
        const response = await transporter.sendMail({
            from: `"${sender.name}" <${sender.email}>`,
            to: customerEmail,
            subject: "Service Slot Booked!",
            html: SLOT_BOOKING_EMAIL_TEMPLATE({
                customerName,
                mechanicName,
                bookingDate,
                bookingTime,
                garageName,
                vehicleNumber,
                mobileNumber
            }),
        });
    } catch (error) {
        throw new Error(`Error in sending booking confirmation email: ${error}`);
    }
}

export const mechanicRequestNotify = async(mechanicEmail , mechanicName , customerName, bookingDate, bookingTime, garageName, vehicleNumber,vehicleType,customerNumber) => {
    try {
        // console.log("inside email of slot confirm")
        const response = await transporter.sendMail({
            from: `"${sender.name}" <${sender.email}>`,
            to: mechanicEmail,
            subject: "New Booking Received!",
            html: MECHANIC_NOTIFICATION_EMAIL_TEMPLATE({
                mechanicName , customerName, bookingDate, bookingTime, garageName, vehicleNumber,vehicleType,customerNumber
            }),
        });
    } catch (error) {
        throw new Error(`Error in sending booking confirmation email: ${error}`);
    }
}

export const sendWelcomeEmail = async (email, name) => {
    try {
        const response = await transporter.sendMail({
            from: `"${sender.name}" <${sender.email}>`,
            to: email,
            subject: "Welcome to AutoMate Company",
            html: `<p>Hello ${name}, welcome to AutoMate Service!!</p>`,
        });
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
    } catch (error) {
        throw new Error(`Error in sending reset email: ${error}`);
    }
};

export const sendDailyMechanicNotification = async (mechanicEmail, mechanicName, todayBookings, yesterdayCompleted, pendingRequests) => {
    try {
        const response = await transporter.sendMail({
            from: `"${sender.name}" <${sender.email}>`,
            to: mechanicEmail,
            subject: "Daily Service Summary",
            html: DAILY_MECHANIC_NOTIFICATION_TEMPLATE({
                mechanicName,
                todayBookings,
                yesterdayCompleted,
                pendingRequests
            }),
        });
        return response;
    } catch (error) {
        throw new Error(`Error in sending daily notification email: ${error}`);
    }
};
