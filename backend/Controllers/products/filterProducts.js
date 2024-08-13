const filterProducts=async(req,res)=>{
    try {
        
    } catch (error) {
          return res.json({
            message:error.message||error,
            error:true,
            success:false
          })
    }

}