import { v2 as cloudinary } from "cloudinary";

import { delete_file, upload_file } from "../../utils/cloudinary.js";
import asyncErrors from "../../middlewares/asyncErrors.js";
import Product from "../../models/Product.js";
import ErrorHandler from "../../utils/errorHandler.js";

export const updateProduct = asyncErrors(async(req, res, next) =>{
  let product = await Product.findById(req?.params?.id);
  let productImage = req.body.images;
  
  if(!product){
    return next(new ErrorHandler("Product Not Found", 404));
  };
  
  if(!productImage){
    return next(new ErrorHandler("Product not found", 404));
  };

  const uploader = async(image) => upload_file(image, req.body.images.length > 1 ? `Products/${product.name}` : "Products");
  const urls = await Promise.all(productImage.map(uploader));
  
  const productWithNewImages = { ...req.body, images: urls };

  for(let i = 0; i < product?.images?.length; i++){
    await delete_file(product?.images[i].public_id);
  };

  // Deletes a product folder if updating it to a single image
  if(product.images.length > 1 && productImage.length === 1){
    await cloudinary.api.delete_folder(`Products/${product.name}`, (error, result) =>{
      if(error){
        console.error(error);
      };
    });
  }
 
  product = await Product.findByIdAndUpdate(req?.params?.id, productWithNewImages, { new: true });
  
  res.status(200).json({ product });
});