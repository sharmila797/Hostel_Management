const mongoose =require('mongoose')   // using Node.js 'require() function'
// import mongoose from 'mongoose'       // Using ES6 imports that is only user frontend
const database = require('../../config/Databaseconnection')

database();
              const UserSchema=new mongoose.Schema({
    userid:{type:String,required:true},
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    status:{type:String,default:'Active'},
    role:{type:String,required:true}
},

              {collection:"User"}
);

// Pre-save middleware to set the default password as userid if not provided
UserSchema.pre('save' ,function (next){
    if(!this.password)  //this context used only regular function only not arrow functions
    {
        this.password=this.userid; // Set password to userid if not provided
    }

    next();
})


const UserModel= mongoose.model("user",UserSchema);

UserModel.create({
    userid: 'admin',
    name: 'Admin',
    email: 'admin@example.com',
    password: 'password123',
    role:'Admin'
  }).then(() => {
    console.log("Admin user created");
  }).catch(err => {
    if (err.code === 11000) {
      console.log("Admin user already exists");
    } else {
      console.error("Error inserting dummy user:", err);
    }
  });

   UserModel.create({
    userid: 'warden',
    name: 'Warden',
    email: 'warden@example.com',
    password: 'password123',
    role:'Warden'
  }).then(()=>{
   console.log("Warden user created") 
  }).catch((err)=>{
    if(err.code === 11000)
    {
      console.log("Warden user already exists") 
    }
    else{
      console.log(err)
    }
    
  })
  
  // newUser.save()
  //   .then(() => console.log("User saved and collection created!"))
  //   .catch((err) => console.log("Error saving user: ", err));


module.exports=UserModel