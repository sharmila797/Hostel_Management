const StudentModel=require('../../model/student/stu_details')
const {generateToken}=require('../../utils/jwt')





// Fetch student details by ID
exports.fetchStudentDetails = async (req, res) => {

  // console.log("request data",req.data)
  // try {
  //   const student = await Student.findById(req.studentId); // Assuming the student's ID is in req.studentId
  //   if (!student) {
  //     return res.status(404).json({ message: "Student not found" });
  //   }
  //   res.json(student);
  // } catch (error) {
  //   res.status(500).json({ message: "Error fetching student details", error });
  // }

console.log("get student data",req.body)

  try {
    console.log("entered")
    const user = await StudentModel.findOne({ $and: [{ userid: req.body.userid }] });
    console.log("entered111")
    console.log(user);

    if (!user) {
      return res.status(200).json({
        success: false,
        message: "User not found",
        Flag: 3
      });
    }

    if (user.status !== "Active") {
      return res.status(200).json({
        success: true,
        message: "User is Inactive",
        Flag: 2
      });
    }

    if (await user.isValidPassword(req.body.password)) {
      // console.log("User verified");

      const token = generateToken(user.userid, user.role);
      req.session.user = user;
      res.cookie('token', token, {
        maxAge: 2 * 60 * 60 * 1000,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      });

      res.status(200).json({
        success: true,
        user: {
          userid: user.userid,
          name: user.name,
          email: user.email,
          password: user.password,
          status: user.status,
          role: user.role,
        },
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Update student profile
// exports.updateStudentProfile = async (req, res) => {
//    console.log("update student",req.body.user)
//   const { name, email, course ,userId} = req.body.user;
//   //  console.log("update student",userId)
//   try {
//     const student = await StudentModel.findById(userId);
//     console.log("student11111",student)
//     if (!student) {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     student.name = name || student.name;
//     student.email = email || student.email;
//     student.course = course || student.course;

//     await student.save();
//     res.json({ message: "Profile updated successfully", student });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating profile", error });
//   }
// };

exports.updateStudentProfile = async (req, res) => {
  try {
    // Validate the incoming request body
    const { name, email, course, userId } = req.body.user;
   
    console.log("Updating student profile:", req.body.user);

    // Fetch the student record
    const student = await StudentModel.findOne({ userid:userId }); // Use custom field `userId`
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Update the student fields if provided
    student.name = name || student.name;
    student.email = email || student.email;
    student.course = course || student.course;

    
    // Save the updated student profile
    const updatedStudent = await student.save();
    console.log("Updated student:", updatedStudent);

    // Respond with success
    return res.status(200).json({ 
      success:true,
      message: "Profile updated successfully", 
      student: updatedStudent 
    });
  } catch (error) {
    console.error("Error updating student profile:", error);
    return res.status(500).json({ 
      success:false,
      message: "Error updating profile", 
      error: error.message 
    });
  }
};



exports.fetchUserstudent = async(req, res) =>{
  try {
    console.log("fetchUserstudent data",req.params.userId)

      const user = await StudentModel.findOne({userid: String(req.params.userId)})
      // console.log("Fetech User")
      console.log(user)
      if (!user) {
          return res.status(404).json({
              success: false,
              message: "User not found",
          })
      }
      res.status(200).json({
          success: true,
          user:{
              userId: user.userid,
                  name: user.name,
                  role: user.role,
                  // campus: user.campus,
                  email: user.email,
                  status : user.status,
                  // faculty: user.faculty,
                  // department: user.department,
                  course:user.course,
                  enrollmentNumber:user.enrollmentNumber
          }
      })
  } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching user data"})
      console.error(error)
  }
}

