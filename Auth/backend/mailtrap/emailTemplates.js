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

export const DAILY_MECHANIC_NOTIFICATION_TEMPLATE = ({ mechanicName, todayBookings, yesterdayCompleted, pendingRequests }) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Daily Service Summary</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f3f4f6; padding: 20px; color: #1f2937;">
  <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
    <div style="background: linear-gradient(to right, #3b82f6, #2563eb); padding: 20px; text-align: center;">
      <h1 style="color: white; margin: 0;">Daily Service Summary</h1>
    </div>
    <div style="padding: 20px;">
      <p>Hello <strong>${mechanicName}</strong>,</p>
      <p>Here's your daily service summary:</p>

      ${todayBookings.length > 0 ? `
      <h2 style="color: #1f2937; margin-top: 20px;">Today's Scheduled Services</h2>
      <table style="width: 100%; margin: 20px 0; border-collapse: collapse;">
        <tr style="background-color: #f3f4f6;">
          <th style="padding: 8px; text-align: left;">Time</th>
          <th style="padding: 8px; text-align: left;">Customer</th>
          <th style="padding: 8px; text-align: left;">Vehicle</th>
        </tr>
        ${todayBookings.map(booking => `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${booking.time}</td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${booking.customerName}</td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${booking.vehicleNumber}</td>
          </tr>
        `).join('')}
      </table>
      ` : '<p>No services scheduled for today.</p>'}

      ${yesterdayCompleted.length > 0 ? `
      <h2 style="color: #1f2937; margin-top: 20px;">Yesterday's Completed Services</h2>
      <table style="width: 100%; margin: 20px 0; border-collapse: collapse;">
        <tr style="background-color: #f3f4f6;">
          <th style="padding: 8px; text-align: left;">Time</th>
          <th style="padding: 8px; text-align: left;">Customer</th>
          <th style="padding: 8px; text-align: left;">Vehicle</th>
        </tr>
        ${yesterdayCompleted.map(booking => `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${booking.time}</td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${booking.customerName}</td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${booking.vehicleNumber}</td>
          </tr>
        `).join('')}
      </table>
      ` : ''}

      ${pendingRequests.length > 0 ? `
      <h2 style="color: #1f2937; margin-top: 20px;">Pending Requests</h2>
      <table style="width: 100%; margin: 20px 0; border-collapse: collapse;">
        <tr style="background-color: #f3f4f6;">
          <th style="padding: 8px; text-align: left;">Date</th>
          <th style="padding: 8px; text-align: left;">Customer</th>
          <th style="padding: 8px; text-align: left;">Vehicle</th>
        </tr>
        ${pendingRequests.map(booking => `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${booking.date}</td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${booking.customerName}</td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${booking.vehicleNumber}</td>
          </tr>
        `).join('')}
      </table>
      ` : ''}

      <p style="margin-top: 20px;">Best regards,<br><strong>AutoMate Team</strong></p>
    </div>
    <div style="background-color: #f1f5f9; text-align: center; padding: 10px; font-size: 12px; color: #6b7280;">
      <p>This is an automated notification. Please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;