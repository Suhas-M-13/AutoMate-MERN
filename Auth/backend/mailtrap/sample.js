const SLOT_BOOKING_EMAIL_TEMPLATE = ({ customerName, mechanicName, bookingDate, bookingTime, garageName, vehicleNumber }) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Slot Booking Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f3f4f6; padding: 20px; color: #1f2937;">
  <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
    <div style="background: linear-gradient(to right, #3b82f6, #2563eb); padding: 20px; text-align: center;">
      <h1 style="color: white; margin: 0;">Service Slot Booked!</h1>
    </div>
    <div style="padding: 20px;">
      <p>Hello <strong>${customerName}</strong>,</p>
      <p>Your vehicle service slot has been successfully booked at <strong>${garageName}</strong>. Below are the details:</p>

      <table style="width: 100%; margin: 20px 0; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; font-weight: bold; color: #4b5563;">Mechanic</td>
          <td style="padding: 8px;">${mechanicName}</td>
        </tr>
        <tr style="background-color: #f9fafb;">
          <td style="padding: 8px; font-weight: bold; color: #4b5563;">Booking Date</td>
          <td style="padding: 8px;">${bookingDate}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold; color: #4b5563;">Booking Time</td>
          <td style="padding: 8px;">${bookingTime}</td>
        </tr>
        <tr style="background-color: #f9fafb;">
          <td style="padding: 8px; font-weight: bold; color: #4b5563;">Vehicle Number</td>
          <td style="padding: 8px;">${vehicleNumber}</td>
        </tr>
      </table>

      <p>Please arrive at the garage 10 minutes prior to the booked time. If you need to reschedule or cancel, contact the garage directly.</p>
      <p>Thank you for choosing <strong>AutoMate</strong> for your vehicle service needs!</p>

      <p style="margin-top: 20px;">Best regards,<br><strong>AutoMate Team</strong></p>
    </div>
    <div style="background-color: #f1f5f9; text-align: center; padding: 10px; font-size: 12px; color: #6b7280;">
      <p>This is an automated notification. Please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;

const MECHANIC_NOTIFICATION_EMAIL_TEMPLATE = ({ customerName, bookingDate, bookingTime, garageName, vehicleNumber }) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Slot Booking Notification</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f3f4f6; padding: 20px; color: #1f2937;">
  <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
    <div style="background: linear-gradient(to right, #f59e0b, #d97706); padding: 20px; text-align: center;">
      <h1 style="color: white; margin: 0;">New Booking Received</h1>
    </div>
    <div style="padding: 20px;">
      <p>Hello,</p>
      <p><strong>${customerName}</strong> has booked a service slot at your garage <strong>${garageName}</strong>.</p>
      <p>Please find the booking details below:</p>

      <table style="width: 100%; margin: 20px 0; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; font-weight: bold; color: #4b5563;">Customer Name</td>
          <td style="padding: 8px;">${customerName}</td>
        </tr>
        <tr style="background-color: #f9fafb;">
          <td style="padding: 8px; font-weight: bold; color: #4b5563;">Booking Date</td>
          <td style="padding: 8px;">${bookingDate}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold; color: #4b5563;">Booking Time</td>
          <td style="padding: 8px;">${bookingTime}</td>
        </tr>
        <tr style="background-color: #f9fafb;">
          <td style="padding: 8px; font-weight: bold; color: #4b5563;">Vehicle Number</td>
          <td style="padding: 8px;">${vehicleNumber}</td>
        </tr>
      </table>

      <p>Please be prepared to receive the customer at the booked time. Ensure all necessary arrangements are in place for a smooth service experience.</p>
      <p>Thank you for being a trusted partner with <strong>AutoMate</strong>.</p>

      <p style="margin-top: 20px;">Best regards,<br><strong>AutoMate Team</strong></p>
    </div>
    <div style="background-color: #f1f5f9; text-align: center; padding: 10px; font-size: 12px; color: #6b7280;">
      <p>This is an automated notification. Please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;


// const htmlContent = SLOT_BOOKING_EMAIL_TEMPLATE({
//   customerName: "John Doe",
//   mechanicName: "Raju Mech",
//   bookingDate: "2025-05-26",
//   bookingTime: "10:30 AM",
//   garageName: "Smart Auto Garage",
//   vehicleNumber: "KA01AB1234"
// });

const htmlContent = MECHANIC_NOTIFICATION_EMAIL_TEMPLATE({
  customerName: "John Doe",
  bookingDate: "2025-05-26",
  bookingTime: "10:30 AM",
  garageName: "Smart Auto Garage",
  vehicleNumber: "KA01AB1234"
});


document.getElementsByTagName("body")[0].innerHTML = htmlContent