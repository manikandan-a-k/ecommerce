import productModel from "../../Models/productModel.js"
const updateProductDetails=async(req,res)=>{
  try{
       const {_id,...rest}=req?.body
       
       const updateProduct=await productModel.findByIdAndUpdate(_id,rest)
       
       res.json({
        message:"Product Updated Success",
        success:true,
        error:false
       })
  }catch(err)
  {
    res.json({
        message:err.message||err,
        success:false,
        error:true
    })
    console.log(err)
  }
}

export default updateProductDetails