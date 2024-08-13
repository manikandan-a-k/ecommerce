import mongoose, { Schema } from "mongoose";

const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:String,
    profilepic:String,
    role:String
},{
    timestamps:true
})
const userModel=mongoose.model("User",userSchema)
export default userModel