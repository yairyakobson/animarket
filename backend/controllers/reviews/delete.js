import { deleteSingleProductReview } from "../../dataAccess/reviewCases.js";

import asyncErrors from "../../middlewares/asyncErrors.js";
import Product from "../../models/Product.js";
import ErrorHandler from "../../utils/errorHandler.js";

export const deleteProductReview = asyncErrors(async(req, res, next) =>{
  let product = await deleteSingleProductReview(req.query.productId);

  if(!product){
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product?.reviews?.filter((review) =>
    review._id.toString() !== req?.query?.id.toString()
  );

  const totalReviews = reviews.length

  const rating = totalReviews === 0 ? 0
  : product.reviews.reduce((acc, item) => item.rating + acc, 0) / totalReviews;

  product = await Product.findByIdAndUpdate(req.query.productId, {
    reviews,
    rating,
    totalReviews
  }, { new: true });

  res.status(200).json({ success: true });
});