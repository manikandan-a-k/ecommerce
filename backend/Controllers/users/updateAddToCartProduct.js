import addToCartModel from "../../Models/addToCartModel.js"
import mongoose from "mongoose"
const updateAddToCartProduct=async(req,res)=>{
    try {

        const currentUserId=req?.userId
        const addToCartProductId=req?.body?._id
       
        const qty=req?.body?.quantity

     

        const updateProduct=await addToCartModel.updateOne({_id:addToCartProductId },{
            ...(qty&&{quantity:qty})
        })
       
        return res.json({
            message:"Product Updated",
            data:updateProduct,
            success:true,
            error:false
        })
    } catch (error) {
        return res.json({
            message:error.message||error,
            error:true,
            success:false
        })
    }
}

export default updateAddToCartProduct