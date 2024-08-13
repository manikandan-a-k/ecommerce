import productModel from "../../Models/productModel.js"

const getProductsCategoryWise=async(req,res)=>{
try{
  const {category}=req?.body
  
  const products=await productModel.find({catagory:category})
  
  res.json({
    data:products,
    success:true,
    error:false
  })
}catch(err){
    res.json({
        message:err.message||err,
        success:false,
        error:true
    })
}

}
export default getProductsCategoryWise