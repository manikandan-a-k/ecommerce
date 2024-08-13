import addToCartModel from "../../Models/addToCartModel.js"

const countAddToCartProducts=async(req,res)=>{
    try {
         const userId=req?.userId
         const count=await addToCartModel.countDocuments({
            userId:userId
         }).populate("productId")
         return res.json({
            data:{
                count:count
            },
            message:"Ok",
            success:true,
            error:false
         })

    } catch (error) {
        return res.json({
            message:error||error?.message,
            error:true,
            success:false
        })
    }

}
export default countAddToCartProducts