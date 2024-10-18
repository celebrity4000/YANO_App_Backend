const express = require("express");
const router = express.Router();
const {
  signup,
  doctorLogin,
  findDoctorById,
  getAllDoctors,
  updateDoctor,
  createPatient,
  findPatientByemail,
  addPatientInTheList,
  getPatientsUnderDoctor,
  removePatientFromDoctor,
  addGlucometer,
  deleteGlucometer,
  googleSignIn,
  googleSignUp,
} = require("../controllers/userDoctorControllers");
const { singleUpload } = require("../middlewares/multer");
const { verifyToken } = require("../middlewares/VerifyToken");
// const { googleSignUp } = require("../controllers/userPatientControllers");

// Signup route
router.post("/signup", singleUpload, signup);

// Google SignIn route
router.post ("/signin-google", googleSignIn);

// Google SignUp route
router.post ("/signup-google", googleSignUp);

//update
router.put("/:id", singleUpload, updateDoctor);

router.post("/login", doctorLogin);

// Find doctor by ID route
router.get("/:id", findDoctorById);

// get all doctors
router.get("/", getAllDoctors);

// post create doctor
router.post("/create-patient/:id", verifyToken, singleUpload, createPatient);

router.post("/find-patient-by-email", verifyToken, findPatientByemail);

router.put("/add-patient-in-list/:doctorId", verifyToken, addPatientInTheList);

//get all patient under this doctor
router.get(
  "/patientsUnderDoctor/:doctorId",
  verifyToken,
  getPatientsUnderDoctor
);

// Remove a patient from a doctor's list
router.delete("/:doctorId/patients/:patientId", removePatientFromDoctor);

//add glucometer
router.post("/glucometer/:userId", verifyToken, addGlucometer);

//remove glucometer
router.delete("/glucometer/:userId", verifyToken, deleteGlucometer);

module.exports = router;
