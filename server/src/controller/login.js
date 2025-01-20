 const UserModel=require('../model/login/user')
const {generateToken}=require("../utils/jwt")




// Manual Auth

exports.manualAuth = async (req, res) => {
  // console.log("Manual Login", req.body);
  try {
    const user = await UserModel.findOne({ $and: [{ userid: req.body.userid }] });
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



// exports.manualAuth=async (req,res)=>{
//   console.log("Manual Login",req.body)
//   try{
//   const user=await UserModel.findOne({$and:[{userid:req.body.userid},{password:req.body.password}]})
//   console.log(user)
//   if(!user){
//     return res.status(200).json({
//       success:false,
//       message:"usernot found",
//       Flag:3
//     });

//      if(user.status !== "Active"){
//       return res.status(200).json({
//         success:true,
//         message: "User is Inactive",
//         Flag: 2
//       })

//      }

//      if(await user.isValidPassword(req.body.password)){
//       console.log("user verified")

//       const token =generateToken(user.userid,user.role);
//       req.session.user=user;
//       res.cookie('token',token,{
//         maxAge:2*60*60*1000,
//         sameSite:'strict',
//         secure:process.env.NODE_ENV === 'production',
//       });

//       res.status(200).json({
//         success:true,
//         user:{
//           userid: user.userid,
//   name: user.name,
//   email: user.email,
//   password: user.password,
//   status: user.status,
//   role: user.role,
//         },
//       })
//      }

//   }
// }catch(err){

//   }


// }


// Logout



exports.logout =  (req, res) => {
  console.log("Logout")
  res.clearCookie('token');
  res.status(200).json({
      success: true,
      message: 'User logged out'
  })
}



// Fetch logined User Data
exports.fetchUser = async(req, res) =>{
    try {
      // console.log("received data",req.params.userId)

        const user = await UserModel.findOne({userid: String(req.params.userId)})
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
                    campus: user.campus,
                    email: user.email,
                    status : user.status,
                    faculty: user.faculty,
                    department: user.department,
            }
        })
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching user data"})
        console.error(error)
    }
}


// exports.fetchUser =async(req,res)=>{
//     const {userid,password}=req.body;
  
//     try{
// const data= await UserModel.findOne({$and:[{userid:userid},{password:password}] })
// console.log(data)
// if (data) {
//     res.status(200).json({ success: true, data });
//   } else {
//     res.status(404).json({ success: false, message: 'User not found' });
//   }
//     }
//     catch(err){
//         console.log(err)
//     }
// }