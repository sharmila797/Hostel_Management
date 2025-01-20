const express=require('express')
const dotenv=require('dotenv')
const path=require('path')
const cors=require('cors')
const session=require('express-session')
const cookieParser=require('cookie-parser')
dotenv.config({path:path.join(__dirname, "src/config/.env")})   //For professional and team-based development: Use this.it handles a wider range of cases and reduces potential issues.
// or dotenv.config({path:path.resolve(__dirname, "./src/config/.env")})  For small-scale projects or specific cases where you are confident in the input paths: Use this for simplicity and performance.
const dbConnection=require('./src/config/Databaseconnection');
const app=express()

const userlogin=require("./src/routes/login/user")
const studentlogin=require("./src/routes/student/student")

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


app.use(session({
    secret: 'A9B93E88E9DE91ED45EA5D3FE611A',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 15 * 60 * 1000 }
}));

app.use(cookieParser());  //parse cookies

app.use('/api/user',userlogin);
app.use('/api/student',studentlogin);






app.listen(process.env.port,()=>{
    console.log("server started at port",process.env.port,process.env.mongodburl)
})