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





const REQUEST_ACCEPT_NOTIFICATION = ({ customerName, mechanicName, bookingDate, bookingTime, garageName, vehicleNumber, mobileNumber }) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Slot Booking Accepted</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f3f4f6; padding: 20px; color: #1f2937;">
  <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
    <div style="background: linear-gradient(to right, #10b981, #059669); padding: 20px; text-align: center;">
      <h1 style="color: white; margin: 0;">Service Slot Accepted!</h1>
    </div>
    <div style="padding: 20px;">
      <p>Hello <strong>${customerName}</strong>,</p>
      <p>Your vehicle service slot has been successfully accepted at <strong>${garageName}</strong>. Below are the details:</p>

      <table style="width: 100%; margin: 20px 0; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; font-weight: bold; color: #4b5563;">Mechanic</td>
          <td style="padding: 8px;">${mechanicName}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold; color: #4b5563;">Mechanic Mobile No.</td>
          <td style="padding: 8px;">${mobileNumber}</td>
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

      <p>You can track the status of the vehicle service through our website.Please do visit our website 'AutoMate' in order to track the status of your vehicle.</p>
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

const SERVICE_COMPLETED_NOTIFICATION = ({ customerName, mechanicName, bookingDate, bookingTime, garageName, vehicleNumber, mobileNumber }) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vehicle Service Completed</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f3f4f6; padding: 20px; color: #1f2937;">
  <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
    <div style="background: linear-gradient(to right, #38bdf8, #6366f1); padding: 20px; text-align: center;">
      <h1 style="color: white; margin: 0;">Vehicle Service Completed!</h1>
    </div>
    <div style="padding: 20px;">
      <p>Hello <strong>${customerName}</strong>,</p>
      <p>Your vehicle service has been successfully completed by the mechanic <strong>${mechanicName}</strong>  at shop <strong>${garageName}</strong>. Below are the details:</p>

      <table style="width: 100%; margin: 20px 0; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; font-weight: bold; color: #4b5563;">Mechanic</td>
          <td style="padding: 8px;">${mechanicName}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold; color: #4b5563;">Mechanic Mobile No.</td>
          <td style="padding: 8px;">${mobileNumber}</td>
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

      <p>Please do visit our website 'AutoMate' in order to track the status of your vehicle and download the invoice generated by the mechanic owner.</p>
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

const INVOICE_GENERATED_NOTIFICATION = ({ customerName, mechanicName, bookingDate, bookingTime, garageName, vehicleNumber, mobileNumber }) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Service Invoice Generated</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f3f4f6; padding: 20px; color: #1f2937;">
  <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
   <div style="background: linear-gradient(to right, #0f172a, #1e293b); padding: 20px; text-align: center;">
      <h1 style="color: white; margin: 0;">Service Invoice Generated!</h1>
    </div>
    <div style="padding: 20px;">
      <p>Hello <strong>${customerName}</strong>,</p>
      <p>The Invoice for your vehicle service has been successfully created by the mechanic <strong>${mechanicName}</strong>  at shop <strong>${garageName}</strong>. Below are the details:</p>

      <table style="width: 100%; margin: 20px 0; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; font-weight: bold; color: #4b5563;">Mechanic</td>
          <td style="padding: 8px;">${mechanicName}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold; color: #4b5563;">Mechanic Mobile No.</td>
          <td style="padding: 8px;">${mobileNumber}</td>
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

      <p>Please do visit our website 'AutoMate' in order to track the status of your vehicle and make the payment through our website for safe transaction.The amount paid by you is completely transfered to Mechanic itself.</p>
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

const MECHANIC_PAYMENT_NOTIFICATION_EMAIL_TEMPLATE = ({mechanicName,customerName,customerNumber,garageName,bookingDate,bookingTime,vehicleNumber,vehicleType,amount
}) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Notification</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f3f4f6; padding: 20px; color: #1f2937;">
  <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
    <div style="background: linear-gradient(to right, #10b981, #059669); padding: 20px; text-align: center;">
      <h1 style="color: white; margin: 0;">Vehicle Service Payment</h1>
    </div>
    <div style="padding: 20px;">
      <p>Hello ${mechanicName},</p>
      <p>We are pleased to inform you that <strong>${customerName}</strong> has successfully completed the payment for their vehicle service at <strong>${garageName}</strong>.</p>

      <p>Please find the customer and booking details below:</p>

      <table style="width: 100%; margin: 20px 0; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; font-weight: bold; color: #4b5563;">Customer Name</td>
          <td style="padding: 8px;">${customerName}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold; color: #4b5563;">Customer Mobile No.</td>
          <td style="padding: 8px;">${customerNumber}</td>
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
        <tr style="background-color: #f9fafb;">
          <td style="padding: 8px; font-weight: bold; color: #4b5563;">Vehicle Type</td>
          <td style="padding: 8px;">${vehicleType}</td>
        </tr>
        <tr style="background-color: #f9fafb;">
          <td style="padding: 8px; font-weight: bold; color: #4b5563;">Amount Paid</td>
          <td style="padding: 8px;">${amount}</td>
        </tr>
      </table>

      <p>No further action is required from your side regarding payment. Thank you for ensuring a quality service experience for the customer.</p>
      <p>Please do check your account once for the payment confirmation</p>
      <p>We appreciate your continued partnership with <strong>AutoMate</strong>.</p>
      <p>If you any query regarding payment please feel to reach out to us through email : <strong>momentdipole33@gmail.com</strong></p>

      <p style="margin-top: 20px;">Best regards,<br><strong>AutoMate Team</strong></p>
    </div>
    <div style="background-color: #f1f5f9; text-align: center; padding: 10px; font-size: 12px; color: #6b7280;">
      <p>This is an automated notification. Please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;


const MECHANIC_FEEDBACK_NOTIFICATION_EMAIL_TEMPLATE = ({
  mechanicName,
  customerName,
  customerNumber,
  garageName,
  bookingDate,
  bookingTime,
  vehicleNumber,
  vehicleType
}) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Feedback Notification</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f3f4f6; padding: 20px; color: #1f2937;">
  <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
    <div style="background: linear-gradient(to right, #3b82f6, #2563eb); padding: 20px; text-align: center;">
      <h1 style="color: white; margin: 0;">Feedback Received</h1>
    </div>
    <div style="padding: 20px;">
      <p>Hello ${mechanicName},</p>
      <p><strong>${customerName}</strong> has submitted feedback regarding their recent service experience at your garage, <strong>${garageName}</strong>.</p>
      <p>Please find the booking details below:</p>

      <table style="width: 100%; margin: 20px 0; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; font-weight: bold; color: #4b5563;">Customer Name</td>
          <td style="padding: 8px;">${customerName}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold; color: #4b5563;">Customer Mobile No.</td>
          <td style="padding: 8px;">${customerNumber}</td>
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
        <tr style="background-color: #f9fafb;">
          <td style="padding: 8px; font-weight: bold; color: #4b5563;">Vehicle Type</td>
          <td style="padding: 8px;">${vehicleType}</td>
        </tr>
      </table>

      <p>Please check the feedback in your dashboard to review the customer's comments.</p>
      <p>Feedback is an important part of improving the service experience and maintaining a high level of customer satisfaction.</p>

      <p>If you have any questions, feel free to contact us at <strong>momentdipole33@gmail.com</strong>.</p>

      <p style="margin-top: 20px;">Best regards,<br><strong>AutoMate Team</strong></p>
    </div>
    <div style="background-color: #f1f5f9; text-align: center; padding: 10px; font-size: 12px; color: #6b7280;">
      <p>This is an automated notification. Please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;



// const htmlContent = INVOICE_GENERATED_NOTIFICATION({
//   customerName: "John Doe",
//   bookingDate: "2025-05-26",
//   bookingTime: "10:30 AM",
//   garageName: "Smart Auto Garage",
//   vehicleNumber: "KA01AB1234",
//   mobileNumber : 9658632541
// });


const htmlContent = MECHANIC_FEEDBACK_NOTIFICATION_EMAIL_TEMPLATE({
  customerName: "John Doe",
  mechanicName: "Raju Mech",
  bookingDate: "2025-05-26",
  bookingTime: "10:30 AM",
  garageName: "Smart Auto Garage",
  vehicleNumber: "KA01AB1234"
});

document.getElementsByTagName("body")[0].innerHTML = htmlContent