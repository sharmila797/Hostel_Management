const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');  // Ensure bcrypt is required
const database=require('../../config/Databaseconnection')





const StudentSchema = new mongoose.Schema({
  userid:{type:String,required:true},
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  enrollmentNumber: { type: String, required: true },
  password:{type:String,required:true},
   course: { type: String, required: true },
  status: { type: String, default: "Active" },
  role:{type:String,required:true},
},
{collection:"Student"});


// Pre-save mongoose middleware to hash the password before saving
StudentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next(); // Don't forget to call next
});

// Method to validate password
StudentSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// const UserModel = mongoose.model('User', UserSchema);
const StudentModel = mongoose.model('Student', StudentSchema);

// Hash the password manually and create or update the dummy users
const createstudent= async (userid, name, email, password, role,course,enrollmentNumber)=>{
  try{
    // Hash the password before inserting
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create or update the user
    await StudentModel.findOneAndUpdate(
      { userid: userid },
      {
        userid: userid,
        name: name,
        email: email,
        password: hashedPassword,  // Use hashed password
        role: role,
        course:course,
        enrollmentNumber:enrollmentNumber
      },
      { upsert: true, new: true }
    );
    console.log(`${role} user created or already exists`);

  }catch{
    console.error(`Error inserting ${role} user:`, err);
  }

}

//create student user
createstudent('student','Student','student@example.com','password123','Student','BTECH','125478')

module.exports = StudentModel;
