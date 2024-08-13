import userModel from "../../Models/userModel.js"



const updateUser=async(req,res)=>{
   try{
          
           const sessionUser=req.userId
           const {userId,email,name,role}=req.body
           const payload={
            ...(email&&{email:email}),
            ...(name&&{name:name}),
            ...(role&&{role:role})

           }
           const updateUser=await userModel.findByIdAndUpdate(userId,payload)
           res.json({
            message:"User Updated",
            data:updateUser,
            success:true,
            error:false
           })
           
   }
   catch(err){
    res.json({
        message:err.message||err,
        success:false,
        error:true
    })
   }
}

export default updateUser