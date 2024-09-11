import Product from "../models/Product.js";

export const createProduct = async(productData) =>{
  return await Product.create(productData);
}

export const fetchSingleProduct = async(query) =>{
  return await Product.findById(query).populate("reviews.user");
}

export const updateSingleProduct = async(query) =>{
  return await Product.findById(query);
}

export const deleteSingleProduct = async(query) =>{
  return await Product.findById(query);
}