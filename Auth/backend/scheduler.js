import cron from 'node-cron';
import { sendDailyNotifications } from './controllers/admin.controller.js';

// Schedule the daily notification to run at 6 AM IST (00:30 UTC)
// The cron expression '30 0 * * *' means:
// - 30: At minute 30
// - 0: At hour 0 (midnight UTC)
// - * * *: Every day, every month, every day of the week
cron.schedule('30 0 * * *', async () => {
    console.log('Running daily notification job...');
    try {
        await sendDailyNotifications();
        console.log('Daily notifications sent successfully');
    } catch (error) {
        console.error('Error in daily notification job:', error);
    }
}); 