const sendNotifications = (name, subject, message) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          padding: 20px;
          margin: 0;
        }
        .container {
          background-color: #ffffff;
          padding: 20px;
          margin: 0 auto;
          max-width: 600px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
          background-color: #76bc21;
          color: white;
          padding: 10px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .content {
          padding: 20px;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          font-size: 12px;
          color: #999;
        }
        .button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #76bc21;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          font-size: 16px;
        }
        .message {
          font-size: 16px;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${subject}</h1>
        </div>
        <div class="content">
          <p>Hello ${name},</p>
          <p>Thank you for getting in touch with us.</p>
          <div class="message">
            <p><strong>Your Message:</strong></p>
            <p>${message}</p>
          </div>
        </div>
        <div class="footer">
          <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = sendNotifications;
