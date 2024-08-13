import userModel from "../../Models/userModel.js"


const userDetails=async(req,res)=>{
    try{
   
       const user=await userModel.findById(req.userId)
       res.status(200).json({
        data:user,
        error:false,
        success:true,
        message:"User Login Active"
       })
    }
    catch(error){
        res.status(401).json({
            message:error.message||error,
            success:false,
            error:true
        })
    }
}
export default userDetails