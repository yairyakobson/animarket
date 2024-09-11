import Product from "../models/Product.js";

export const createProductReview = async(query) =>{
  return await Product.findById(query);
}

export const fetchProductReviews = async(query) =>{
  return await Product.findById(query).populate("reviews.user");
}

export const deleteSingleProductReview = async(query) =>{
  return await Product.findById(query);
}

// export const fetchAverageProductRating = async(query) =>{
//   return await Product.findByIdAndUpdate(query);
// }