import mongoose from "mongoose"

const productSchema=mongoose.Schema({
    productName: String,
    brandName: String,
    catagory:String,
    productImage: [],
    description: String,
    price: Number,
    selling: Number,
},
{
    timestamps:true
}
)

const productModel=mongoose.model("products",productSchema)
export default productModel