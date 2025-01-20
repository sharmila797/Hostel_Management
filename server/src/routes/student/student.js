const express =require('express')

const router=express.Router();

const { fetchStudentDetails, updateStudentProfile,fetchUserstudent } = require("../../controller/student/student_detail");
const  protect = require("../../middlewares/authMiddleware"); // Ensure only authenticated users can access

// Route to fetch student details
// router.route('/manual').post(manualAuth)
router.route('/detail').post(fetchStudentDetails);
router.route('/get/:userId').get(fetchUserstudent)

// Route to update student profile
router.route("/update").post(updateStudentProfile);

module.exports = router;
