import productModel from "../../Models/productModel.js";

const searchProducts = async (req, res) => {
  try {
    const query = req.query.q;
    const regex = new RegExp(query, 'i', 'g');
    const products = await productModel.find({
      "$or": [
        {
          productName: regex,
        },
        {
          catagory: regex,
        },
      ],
    })
    return res.json({
         data:products,
         message:"Search Product",
         error:false,
         success:true
    })
  } catch (error) {
     return res.json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export default searchProducts;
