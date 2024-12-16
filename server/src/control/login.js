 const UserModel=require('../model/login/user')



exports.fetchUser =async(req,res)=>{
    const {userid,password}=req.body;
  
    try{
const data= await UserModel.findOne({$and:[{userid:userid},{password:password}] })
console.log(data)
if (data) {
    res.status(200).json({ success: true, data });
  } else {
    res.status(404).json({ success: false, message: 'User not found' });
  }
    }
    catch(err){
        console.log(err)
    }
}