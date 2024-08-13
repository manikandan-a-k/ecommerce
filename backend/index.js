import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDb from "./Database/database.connect.js"
import router from "./Routes/index.js"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
dotenv.config()
const app=express()
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL, // Your frontend's origin
    methods:["POST","GET"],
    credentials: true, 
}))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use("/api",router)

const port=8080;

app.listen(port,()=>{
    console.log(`Server is Running ${port}`)
    connectDb()
})



