import { fetchProductReviews } from "../../dataAccess/reviewCases.js";

import asyncErrors from "../../middlewares/asyncErrors.js";
import ErrorHandler from "../../utils/errorHandler.js";

export const getProductReviews = asyncErrors(async(req, res, next) =>{
  const product = await fetchProductReviews(req.query.id);
  
  if(!product){
    return next(new ErrorHandler("Product Not Found", 404));
  };
  
  res.status(200).json({
    success: true,
    reviews: product.reviews
  });
});