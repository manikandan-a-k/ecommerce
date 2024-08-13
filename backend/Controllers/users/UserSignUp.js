import userModel from "../../Models/userModel.js"
import bcrypt from "bcryptjs"

const userSignUpController=async(req,res)=>{
try{
   const {name,email,password}=req.body
   const userEmail=await userModel.findOne({email})
    if(userEmail)
    {
        throw new Error("Email Already Exists")
    }
   if(!name)
   {
    throw new Error("Please Provide Name")
   }
   if(!email)
    {
     throw new Error("Please Provide Email")
    }
    if(!password||password.length<6)
        {
         throw new Error("Please Provide Password and Password Length Should be six Characters")
        }


        const salt=bcrypt.genSaltSync(10)
        const hashPassword=await bcrypt.hashSync(password,salt)
        if(!hashPassword)
        {
            throw new Error("Your Password is Not Encrypted Please Try Again")
        }
        const payload={
            ...req.body,
            role:"General",
            password:hashPassword
        }
        const userData=new userModel(payload)
       const saveData=await userData.save()
       
        res.status(201).json({
            data:saveData,
             success:true,
             error:false,
             message:"User Created Successfully"
        })

}
catch(error){
   res.json({
    message:error.message||error,
    error:true,
    success:false
   })
}

}
export default userSignUpController;