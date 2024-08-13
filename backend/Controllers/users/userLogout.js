const userLogout=(req,res)=>{
    try{
       res.clearCookie("token")
       res.json({
        message:"Logout Successfully",
        success:true,
        error:false,
        data:[]
       })
    }
    catch(error){
        res.json({
            message: error.message || error,
            error: true,
            success: false,
          });
    }

}
export default userLogout