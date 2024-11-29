const mongoose=require('mongoose')


const databaseConnection=async()=>{
    try{
        await mongoose.connect(process.env.mongodburl,{
            useNewUrlParser: true,
          useUnifiedTopology: true,
        }).then(()=>{
            console.log("mongodb connected")
        })
    }
catch(error){
    console.log("mongodb not connected",error)
    process.exit(1);
}

}
module.exports=databaseConnection;