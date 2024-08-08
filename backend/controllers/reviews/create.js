import asyncErrors from "../../middlewares/asyncErrors.js";
import Product from "../../models/Product.js";

export const newProductReview = asyncErrors(async(req, res, next) =>{
  const { rating, comment, productId } = req.body;
  const review ={
    user: req?.user?._id,
    name: req?.user?.name,
    rating: Number(rating),
    comment
  };
  const product = await Product.findById(productId);

  const isReviewed = product?.reviews.find(
    (r) => r.user.toString() === req?.user?._id.toString()
  );

  if(isReviewed){
    product.reviews.forEach(review =>{
      if(review?.user?.toString() === req?.user?._id.toString()){
        review.comment = comment;
        review.rating = rating;
      };
    });
  }
  else{
    product.reviews.push(review);
    product.totalReviews = product.reviews.length;
  };

  product.rating = product.reviews.reduce((acc, item) =>
  item.rating + acc, 0) / product.reviews.length

  await product.save();
  res.status(200).json({ success: true });
});