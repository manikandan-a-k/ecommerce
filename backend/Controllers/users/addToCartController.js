import addToCartModel from "../../Models/addToCartModel.js"

const addToCartController = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.userId;
        
        const productExists = await addToCartModel.findOne({ productId: productId, userId: userId });
        if (productExists) {
            return res.json({
                message: "Product already exists in your Cart",
                success: false,
                error: true
            });
        }

        const payload = {
            productId: productId,
            quantity: 1,
            userId: userId
        };

        const addProduct = new addToCartModel(payload);
        const saveProduct = await addProduct.save();

        return res.json({
            data: saveProduct,
            message: "Product added",
            success: true,
            error: false
        });

    } catch (error) {
        return res.json({
            message: "Error",
            error: true
        });
    }
};

export default addToCartController;
