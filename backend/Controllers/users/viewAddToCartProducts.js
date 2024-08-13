import addToCartModel from "../../Models/addToCartModel.js"

const viewAddToCartProducts=async(req,res)=>{
 try {
     const userId=req?.userId
     const allProducts=await addToCartModel.find({
        userId:userId
     }).populate("productId")

     return res.json({
        data:allProducts,
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

export default viewAddToCartProducts