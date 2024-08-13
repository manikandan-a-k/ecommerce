import productModel from "../../Models/productModel.js"


const getProductCategory=async(req,res)=>{

    try{
        const productCategory=await productModel.distinct("catagory")
         
         const productByCategory=[]
         for(const catagory of productCategory)
         {
             const product=await productModel.findOne({catagory})
             if(product)
             {
                productByCategory.push(product)
             }
         }
         res.json({
            message:"Product Categories",
            success:true,
            error:false,
            data:productByCategory
         })
    }catch(err){
        res.status(401).json({
            message:err||err.message,
            success:false,
            error:true
        })
    }

}
export default getProductCategory