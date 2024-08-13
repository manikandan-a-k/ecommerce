import userModel from "../../Models/userModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error("Please Provide Email");
    }
    if (!password) {
      throw new Error("Please Provide Password");
    }
     const user=await userModel.findOne({email})
     if(!user)
     {
      throw new Error("User Not Found")
     }
     const checkPassword=await bcrypt.compare(password,user.password)
     if(checkPassword){
      const token= await jwt.sign({email:user.email,id:user._id,name:user.name},process.env.SECRET_KEY,{expiresIn:"8hr"})
      res.cookie("token",token).json({
        message:"Login Success",
        data:token,
        success:true,
        error:false
      })
      
     }else{
        throw new Error("Please Check Your Password")
     }
    



  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export default userLogin;
