
import jwt from  "jsonwebtoken"
const authToken=async(req,res,next)=>{
   try{
    const token =req.cookies.token
    if(!token)
    {
      return res.status(200).json({
        message:"Please Login..!",
        error:true,
        success:false
      })
    }
    jwt.verify(token,process.env.SECRET_KEY,(err,decode)=>{
       
       if(err){
        console.log(err)
       }
       req.userId=decode.id
        next()
    })
   }catch(err){
    res.status(400).json({
      message:err.message,
      data:[],
      error:true,
      success:false
    })
   }
}
export default authToken