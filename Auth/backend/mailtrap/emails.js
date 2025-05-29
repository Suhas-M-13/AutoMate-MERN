import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE , SLOT_BOOKING_EMAIL_TEMPLATE , MECHANIC_NOTIFICATION_EMAIL_TEMPLATE, REQUEST_ACCEPT_NOTIFICATION, SERVICE_COMPLETED_NOTIFICATION, INVOICE_GENERATED_NOTIFICATION, MECHANIC_PAYMENT_NOTIFICATION_EMAIL_TEMPLATE, MECHANIC_FEEDBACK_NOTIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
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



// Mechanic Notification

export const mechanicRequestNotify = async(mechanicEmail , mechanicName , customerName, bookingDate, bookingTime, garageName, vehicleNumber,vehicleType,customerNumber) => {
    try {
        // console.log("inside email of slot confirm")
        const response = await transporter.sendMail({
            from: `"${sender.name}" <${sender.email}>`,
            to: mechanicEmail,
            subject: "New Booking Received!",
            html: MECHANIC_NOTIFICATION_EMAIL_TEMPLATE({
                mechanicName , customerName, customerNumber,garageName,bookingDate, bookingTime, vehicleNumber,vehicleType
            }),
        });
    } catch (error) {
        throw new Error(`Error in sending booking confirmation email: ${error}`);
    }
}

export const paymentNotification = async(mechanicEmail , mechanicName , customerName, bookingDate, bookingTime,paymentDate,paymentTime, garageName, vehicleNumber,vehicleType,customerNumber,amount) => {
    try {
        // console.log("inside email of slot confirm")
        const response = await transporter.sendMail({
            from: `"${sender.name}" <${sender.email}>`,
            to: mechanicEmail,
            subject: "Vehicle Service Payment!",
            html: MECHANIC_PAYMENT_NOTIFICATION_EMAIL_TEMPLATE({
                mechanicName , customerName, customerNumber,garageName,bookingDate, bookingTime,paymentDate,paymentTime, vehicleNumber,vehicleType,amount
            }),
        });
    } catch (error) {
        throw new Error(`Error in sending booking confirmation email: ${error}`);
    }
}

export const feedbackNotification = async(mechanicEmail , mechanicName , customerName, bookingDate, bookingTime,feedbackDate,feedbackTime, garageName, vehicleNumber,vehicleType,customerNumber,rating) => {
    try {
        // console.log("inside email of slot confirm")
        const response = await transporter.sendMail({
            from: `"${sender.name}" <${sender.email}>`,
            to: mechanicEmail,
            subject: "Feedback Received!",
            html: MECHANIC_FEEDBACK_NOTIFICATION_EMAIL_TEMPLATE({
                mechanicName , customerName, customerNumber,garageName,bookingDate, bookingTime,feedbackDate,feedbackTime, vehicleNumber,vehicleType,rating
            }),
        });
    } catch (error) {
        throw new Error(`Error in sending booking confirmation email: ${error}`);
    }
}




// Customer Notification

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

export const acceptNotification = async(customerEmail, customerName, mechanicName, bookingDate, bookingTime, garageName, vehicleNumber, mobileNumber) => {
    try {
        // console.log("inside email of slot confirm")
        const response = await transporter.sendMail({
            from: `"${sender.name}" <${sender.email}>`,
            to: customerEmail,
            subject: "Service Slot Accepted!",
            html: REQUEST_ACCEPT_NOTIFICATION({
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

export const completeNotification = async(customerEmail, customerName, mechanicName, bookingDate, bookingTime, garageName, vehicleNumber, mobileNumber) => {
    try {
        // console.log("inside email of slot confirm")
        const response = await transporter.sendMail({
            from: `"${sender.name}" <${sender.email}>`,
            to: customerEmail,
            subject: "Vehicle Service Completed!",
            html: SERVICE_COMPLETED_NOTIFICATION({
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

export const invoiceGeneratedNotification = async(customerEmail, customerName, mechanicName, bookingDate, bookingTime, garageName, vehicleNumber, mobileNumber) => {
    try {
        // console.log("inside email of slot confirm")
        const response = await transporter.sendMail({
            from: `"${sender.name}" <${sender.email}>`,
            to: customerEmail,
            subject: "Service Invoice Generated!",
            html: INVOICE_GENERATED_NOTIFICATION({
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