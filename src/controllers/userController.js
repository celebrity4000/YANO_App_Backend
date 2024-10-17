const UserDoctor = require("../models/UserDoctor");
const UserPatient = require("../models/UserPatient");

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing id" });
    }

    let users = null;
    users = await UserDoctor.find({ _id: id });

    if (!users) {
      users = await UserPatient.find({ _id: id });
    }

    if (!users) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(users[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
