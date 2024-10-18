const UserDoctor = require("../models/UserDoctor");
const Notification = require("../models/Notifications");
const sendNotificationViaMail = require("../utils/emailSend");

exports.sendNotificationToDoctors = async (req, res) => {
  try {
    const { id } = req.params;

    const { subject, message, isSendEmail } = req.body;

    const doctor = await UserDoctor.findById(id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const newNotification = await Notification.create({
      userId: doctor._id,
      userType: "UserDoctor",
      subject,
      message,
    });

    if (!newNotification) {
      return res.status(500).json({ message: "Failed to send notification" });
    }

    if (isSendEmail) {
      const sendMail = await sendNotificationViaMail(
        doctor.email,
        `${doctor.firstName} ${doctor.lastName}`,
        subject,
        message
      );

      if (!sendMail.success) {
        return res.status(500).json({ message: "Failed to send email" });
      }
    }

    res.status(200).json({ message: "Notification sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
