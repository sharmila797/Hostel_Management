const express=require('express')
const dotenv=require('dotenv')
const path=require('path')
const cors=require('cors')
dotenv.config({path:path.join(__dirname, "src/config/.env")})
const dbConnection=require('./src/config/Databaseconnection');
const app=express()

const userlogin=require("./src/routes/login/user")

dbConnection();
app.use(cors(
    {
        credentials:true,
        origin:["http://localhost:3000"]
    }
)) //which allows resources from different origins to access your backend.

app.use(express.json());
//If the incoming request contains invalid JSON, express.json() will return a 400 Bad Request error, preventing malformed data from causing issues in your code.

//app.use() middleware function of express application

app.use(express.urlencoded({extended:true})) 
//parse URL-encoded form data and convert it into a JavaScript object, making it easier to access the data in your server-side code.


app.use('/api/user',userlogin);






app.listen(process.env.port,()=>{
    console.log("server started at port",process.env.port,process.env.mongodburl)
})