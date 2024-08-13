import productModel from "../../Models/productModel.js"

const getProductDetails=async(req,res)=>{
    try{
          const {productId}=req?.body
          const product=await productModel.findById(productId)

          res.json({
            data:product,
            success:true,
            error:false,
            message:"Product Details"
          })
    }catch(error)
    {
        res.json({
            message:error.message||error,
            success:false,
            error:true
        })
    }

}
export default getProductDetails