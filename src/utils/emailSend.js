const nodemailer = require("nodemailer");
const sendNotifications = require("../../EmailTemplates/sendNotifications");

const sendNotificationViaMail = async (email, name, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "sonaliasrtech@gmail.com",
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const htmlContent = sendNotifications(name, subject, message);

    const mailOptions = {
      from: "sonaliasrtech@gmail.com",
      to: email,
      subject: subject,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);

    return { success: true, message: `Email sent to ${email}` };
  } catch (error) {
    return {
      success: false,
      message: "Error sending email",
      error: error.message,
    };
  }
};

module.exports = sendNotificationViaMail;
