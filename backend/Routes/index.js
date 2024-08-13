import express from "express"
import userSignUpController from "../Controllers/users/UserSignUp.js"
import userLogin from "../Controllers/users/UserSignIn.js"
import userDetails from "../Controllers/users/UserDetails.js"
import userLogout from "../Controllers/users/userLogout.js"
import authToken from "../Middleware/authToken.js"
import allUsers from "../Controllers/users/allUsers.js"
import updateUser from "../Controllers/users/updateUser.js"
import uploadProduct from "../Controllers/products/uploadProduct.js"
import getProducts from "../Controllers/products/getProducts.js"
import updateProductDetails from "../Controllers/products/updateProduct.js"
import getProductCategory from "../Controllers/products/getProductsCategory.js"
import getProductsCategoryWise from "../Controllers/products/getProductsCategoryWise.js"
import getProductDetails from "../Controllers/products/getProductDetails.js"
import addToCartController from "../Controllers/users/addToCartController.js"
import countAddToCartProducts from "../Controllers/users/countAddToCartProducts.js"
import viewAddToCartProducts from "../Controllers/users/viewAddToCartProducts.js"
import updateAddToCartProduct from "../Controllers/users/updateAddToCartProduct.js"
import deleteAddToCart from "../Controllers/users/deleteAddToCart.js"
import searchProducts from "../Controllers/products/searchProducts.js"
import forgotPassword from "../Controllers/users/forgotPassword.js"
const router=express.Router()

//User
router.post("/signup",userSignUpController)
router.post("/login",userLogin)
router.get("/user",authToken,userDetails)
router.get("/userLogout",userLogout)
router.post("/forgot-password",forgotPassword)

//Admin
router.get("/allUsers",authToken,allUsers)
router.post("/updateUser",authToken,updateUser)


//Product
router.post("/uploadProduct",authToken,uploadProduct)
router.get("/getProducts",getProducts)
router.post("/updateProducts",updateProductDetails)
router.get("/getProductCategory",getProductCategory)
router.post("/category-products",getProductsCategoryWise)
router.post("/product-details",getProductDetails)
router.get("/search-product",searchProducts)

//Add To Cart
router.post("/addtocart",authToken,addToCartController)
router.get("/countaddtocartproducts",authToken,countAddToCartProducts)
router.get("/viewaddtocardproducts",authToken,viewAddToCartProducts)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCart)

export default router