import { delete_file } from "../../../utils/cloudinary.js";

import { deleteProduct } from "../../../controllers/products/delete.js";
import { deleteOrder } from "../../../controllers/orders/delete.js";
import { deleteProductReview } from "../../../controllers/reviews/delete.js";

import asyncErrors from "../../../middlewares/asyncErrors.js";
import Order from "../../../models/Order.js";
import Product from "../../../models/Product.js";
import User from "../../../models/User.js";
import ErrorHandler from "../../../utils/errorHandler.js";

export const adminDeleteUser = asyncErrors(async(req, res, next) =>{
  const user = await User.findById(req.params.id);
  if(!user){
    return next(new ErrorHandler(`User with ID of: ${req.params.id} not found`), 404);
  };
  if(user?.picture?.public_id){
    await delete_file(user?.picture?.public_id);
  };

  const products = await Product.find({ seller: user.name });
  for(let product of products){
    await deleteProduct({ params: { id: product._id } }, res, next);
  };

  const orders = await Order.find({ user: req.params.id });
  for(let order of orders){
    await deleteOrder({ params: { id: order._id } }, res, next);
  };

  const reviews = await Product.find({ "reviews.user": req.params.id });
  for(let product of reviews){
    const reviewsToDelete = product.reviews.filter(review => review.user.toString() === req.params.id);
    
    for(let review of reviewsToDelete){
      await deleteProductReview({ query: { productId: product._id, id: review._id } }, res, next);
    };
  };

  await user.deleteOne();
  res.status(200).json({ message: "User Deleted" });
});