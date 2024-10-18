const mongoose = require("mongoose");

const { Schema } = mongoose;

const NotificationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    userType: {
      type: String,
      enum: ["UserPatient", "UserDoctor"],
      required: true,
    },
    subject: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

NotificationSchema.virtual("user", {
  ref: (doc) => doc.userType,
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

module.exports = mongoose.model("Notification", NotificationSchema);
