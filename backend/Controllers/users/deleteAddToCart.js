import addToCartModel from "../../Models/addToCartModel.js"

const deleteAddToCart=async(req,res)=>{
    try {
         const productId=req?.body?._id

         const deleteProduct=await addToCartModel.deleteOne({_id:productId})
         return res.json({
            message:"Product Delete From Add To Cart",
            success:true,
            error:false

         })
    } catch (error) {
        return res.json({
            message:error.message||error,
            success:false,
            error:true
        })
    }

}
export default deleteAddToCart