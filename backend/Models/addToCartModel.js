import mongoose, { Schema } from "mongoose";

const addToCartSchema=new Schema({
    productId:{
        ref:"products",
        type:String
    },
    quantity:Number,
    userId:String
},{
    timestamps:true
})
const addToCartModel=mongoose.model("addToCart",addToCartSchema)
export default addToCartModel