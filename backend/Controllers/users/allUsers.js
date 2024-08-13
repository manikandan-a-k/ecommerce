import userModel from "../../Models/userModel.js";

const allUsers=async(req,res)=>{
    try{
        const allUsers=await userModel.find()
        res.json({
            message:"All Users",
            data:allUsers,
            success:true,
            error:false
        })
    }catch(err){
        res.json({
            message: err,
            error: true,
            success: false,
          });
    }
}
export default allUsers;