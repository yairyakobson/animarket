import asyncErrors from "../../middlewares/asyncErrors.js";
import Product from "../../models/Product.js";
import ErrorHandler from "../../utils/errorHandler.js";

export const getProductReviews = asyncErrors(async(req, res, next) =>{
  const product = await Product.findById(req.query.id).populate("reviews.user");
  
  if(!product){
    return next(new ErrorHandler("Product Not Found", 404));
  };
  
  res.status(200).json({
    success: true,
    reviews: product.reviews
  });
});