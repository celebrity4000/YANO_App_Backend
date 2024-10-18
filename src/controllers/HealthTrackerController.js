const BloodGlucose = require("../models/BloodGlucose");

exports.getHealthTracker = async (req, res) => {
  const { userId } = req.params;
  try {
    const records = await BloodGlucose.find({ userId }).select(
      "-_id -userId -__v"
    );

    if (!records || records.length === 0) {
      return res
        .status(404)
        .json({ message: "No records found for this user" });
    }

    const modifiedRecords = records.map((record) => {
      return {
        name: "Blood Glucose",
        ...record._doc,
      };
    });

    res.status(200).json(modifiedRecords);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
