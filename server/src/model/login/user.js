const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // Ensure bcrypt is required
const database = require('../../config/Databaseconnection');

database();

const UserSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: String, default: 'Active' },
  role: { type: String, required: true }
}, { collection: "User" });

// Pre-save mongoose middleware to hash the password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next(); // Don't forget to call next
});

// Method to validate password
UserSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const UserModel = mongoose.model('User', UserSchema);

// Hash the password manually and create or update the dummy users
const createUser = async (userid, name, email, password, role) => {
  try {
    // Hash the password before inserting
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create or update the user
    await UserModel.findOneAndUpdate(
      { userid: userid },
      {
        userid: userid,
        name: name,
        email: email,
        password: hashedPassword,  // Use hashed password
        role: role,
      },
      { upsert: true, new: true }
    );
    console.log(`${role} user created or already exists`);
  } catch (err) {
    console.error(`Error inserting ${role} user:`, err);
  }
};





// Create Admin and Warden users
createUser('admin', 'Admin', 'admin@example.com', 'password123', 'Admin');
createUser('warden', 'Warden', 'warden@example.com', 'password123', 'Warden');
// createUser('student','Student','student@example.com','password123','Student');

module.exports = UserModel;















// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');  // Ensure bcrypt is required
// const database = require('../../config/Databaseconnection');

// database();

// const UserSchema = new mongoose.Schema({
//   userid: { type: String, required: true },
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   status: { type: String, default: 'Active' },
//   role: { type: String, required: true }
// }, { collection: "User" });

// // Pre-save middleware to hash the password before saving
// UserSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     return next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next(); // Don't forget to call next
// });

// // Method to validate password
// UserSchema.methods.isValidPassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

// const UserModel = mongoose.model('User', UserSchema);

// // Create or update dummy users
// UserModel.findOneAndUpdate(
//   { userid: 'admin' },
//   {
//     userid: 'admin',
//     name: 'Admin',
//     email: 'admin@example.com',
//     password: 'password123',
//     role: 'Admin',
//   },
//   { upsert: true, new: true }
// ).then(() => {
//   console.log("Admin user created or already exists");
// }).catch(err => {
//   console.error("Error inserting admin user:", err);
// });

// UserModel.findOneAndUpdate(
//   { userid: 'warden' },
//   {
//     userid: 'warden',
//     name: 'Warden',
//     email: 'warden@example.com',
//     password: 'password123',
//     role: 'Warden',
//   },
//   { upsert: true, new: true }
// ).then(() => {
//   console.log("Warden user created or already exists");
// }).catch(err => {
//   console.error("Error inserting warden user:", err);
// });

// module.exports = UserModel;




















