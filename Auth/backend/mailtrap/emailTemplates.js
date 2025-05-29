export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Verify Your Email</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>Thank you for signing up! Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4CAF50;">{verificationCode}</span>
    </div>
    <p>Enter this code on the verification page to complete your registration.</p>
    <p>This code will expire in 15 minutes for security reasons.</p>
    <p>If you didn't create an account with us, please ignore this email.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset Successful</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We're writing to confirm that your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #4CAF50; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>If you did not initiate this password reset, please contact our support team immediately.</p>
    <p>For security reasons, we recommend that you:</p>
    <ul>
      <li>Use a strong, unique password</li>
      <li>Enable two-factor authentication if available</li>
      <li>Avoid using the same password across multiple sites</li>
    </ul>
    <p>Thank you for helping us keep your account secure.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>This link will expire in 1 hour for security reasons.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const SLOT_BOOKING_EMAIL_TEMPLATE = ({ customerName, mechanicName, bookingDate, bookingTime, garageName, vehicleNumber, mobileNumber }) => `
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



export const REQUEST_ACCEPT_NOTIFICATION = ({ customerName, mechanicName, bookingDate, bookingTime, garageName, vehicleNumber, mobileNumber }) => `
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

export const SERVICE_COMPLETED_NOTIFICATION = ({ customerName, mechanicName, bookingDate, bookingTime, garageName, vehicleNumber, mobileNumber }) => `
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

export const INVOICE_GENERATED_NOTIFICATION = ({ customerName, mechanicName, bookingDate, bookingTime, garageName, vehicleNumber, mobileNumber }) => `
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

      <p>Please do visit our website 'AutoMate' in order to view the invoice of your vehicle service and make the payment through our website for safe transaction.The amount paid by you is completely transfered to Mechanic itself.</p>
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

export const MECHANIC_PAYMENT_NOTIFICATION_EMAIL_TEMPLATE = ({mechanicName,customerName,customerNumber,garageName,bookingDate,bookingTime,paymentDate,paymentTime,vehicleNumber,vehicleType,amount}) => `
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
      <h1 style="color: white; margin: 0;">Vehicle Service Payment!</h1>
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
          <td style="padding: 8px; font-weight: bold; color: #4b5563;">Payment Date</td>
          <td style="padding: 8px;">${paymentDate}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold; color: #4b5563;">Payment Time</td>
          <td style="padding: 8px;">${paymentTime}</td>
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
      <p>If you any query regarding payment please feel to reach out to us through email : <strong>momentdipole33@gmail.com</strong></p>
      <p>We appreciate your continued partnership with <strong>AutoMate</strong>.</p>

      <p style="margin-top: 20px;">Best regards,<br><strong>AutoMate Team</strong></p>
    </div>
    <div style="background-color: #f1f5f9; text-align: center; padding: 10px; font-size: 12px; color: #6b7280;">
      <p>This is an automated notification. Please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;

export const MECHANIC_FEEDBACK_NOTIFICATION_EMAIL_TEMPLATE = ({mechanicName,customerName,customerNumber,garageName,bookingDate,bookingTime,feedbackDate,feedbackTime,vehicleNumber,vehicleType,rating}) => `
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
      <h1 style="color: white; margin: 0;">Feedback Received!</h1>
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
          <td style="padding: 8px; font-weight: bold; color: #4b5563;">Feedback Date</td>
          <td style="padding: 8px;">${feedbackDate}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold; color: #4b5563;">Feedback Time</td>
          <td style="padding: 8px;">${feedbackTime}</td>
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
          <td style="padding: 8px; font-weight: bold; color: #4b5563;">Rating</td>
          <td style="padding: 8px;">${rating}</td>
        </tr>
      </table>

      <p>Please check the feedback in your dashboard to review the customer's comments.</p>
      <p>Feedback is an important part of improving the service experience and maintaining a high level of customer satisfaction.</p>

      <p style="margin-top: 20px;">Best regards,<br><strong>AutoMate Team</strong></p>
    </div>
    <div style="background-color: #f1f5f9; text-align: center; padding: 10px; font-size: 12px; color: #6b7280;">
      <p>This is an automated notification. Please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;
export const MECHANIC_NOTIFICATION_EMAIL_TEMPLATE = ({ mechanicName , customerName, customerNumber,garageName,bookingDate, bookingTime, vehicleNumber,vehicleType}) => `
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
      <p>Hello ${mechanicName},</p>
      <p><strong>${customerName}</strong> has booked a service slot at your garage <strong>${garageName}</strong>.</p>
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

