import productModel from "../../Models/productModel.js"
const getProducts=async(req,res)=>{
    try{
          
        const allProducts=await productModel.find().sort({createdAt:-1})
        res.json({
            message:"All Products",
            success:true,
            error:false,
            data:allProducts

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

export default getProducts