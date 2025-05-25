import { User } from "../models/user.model.js";
import { book } from "../models/bookSlot.model.js";
import { sendDailyMechanicNotification } from "../mailtrap/emails.js";

export const sendDailyNotifications = async () => {
    try {
        // Get all mechanics
        const mechanics = await User.find({ role: 'mechanic' }).select('email name');

        // Get today's date in IST
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Get yesterday's date in IST
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        for (const mechanic of mechanics) {
            try {
                // Get today's bookings
                const todayBookings = await book.find({
                    mechanicId: mechanic._id,
                    bookDate: today.toISOString().split('T')[0],
                    isCompleted: false
                }).select('bookTime customerName registerNumber');

                // Get yesterday's completed bookings
                const yesterdayCompleted = await book.find({
                    mechanicId: mechanic._id,
                    bookDate: yesterday.toISOString().split('T')[0],
                    isCompleted: true
                }).select('bookTime customerName registerNumber');

                // Get pending requests
                const pendingRequests = await book.find({
                    mechanicId: mechanic._id,
                    isAccepted: false,
                    isCompleted: false
                }).select('bookDate customerName registerNumber');

                // Format the data for the email
                const formattedTodayBookings = todayBookings.map(booking => ({
                    time: booking.bookTime,
                    customerName: booking.customerName,
                    vehicleNumber: booking.registerNumber
                }));

                const formattedYesterdayCompleted = yesterdayCompleted.map(booking => ({
                    time: booking.bookTime,
                    customerName: booking.customerName,
                    vehicleNumber: booking.registerNumber
                }));

                const formattedPendingRequests = pendingRequests.map(booking => ({
                    date: booking.bookDate,
                    customerName: booking.customerName,
                    vehicleNumber: booking.registerNumber
                }));

                // Send the email
                await sendDailyMechanicNotification(
                    mechanic.email,
                    mechanic.name,
                    formattedTodayBookings,
                    formattedYesterdayCompleted,
                    formattedPendingRequests
                );

                console.log(`Daily notification sent to ${mechanic.email}`);
            } catch (error) {
                console.error(`Error sending daily notification to ${mechanic.email}:`, error);
                // Continue with next mechanic even if one fails
                continue;
            }
        }

        return { success: true, message: "Daily notifications sent successfully" };
    } catch (error) {
        console.error("Error in sendDailyNotifications:", error);
        throw error;
    }
}; 