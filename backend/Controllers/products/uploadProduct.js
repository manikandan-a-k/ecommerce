import productModel from "../../Models/productModel.js"

const uploadProduct=async(req,res)=>{
    try{
       
        
         
        const uploadProduct=new productModel(req.body)
        const saveProduct=await uploadProduct.save()
        
        res.status(401).json({
            message:"Product Uploaded Success",
            error:false,
            success:true,
            data:saveProduct
        })
    }
    catch(error)
    {
        res.status(401).json({
            message:error,
            success:false,
            error:true
        })
    }

}
export default uploadProduct