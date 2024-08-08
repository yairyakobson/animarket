import { v2 as cloudinary } from "cloudinary";

import { delete_file } from "../../utils/cloudinary.js";

import asyncErrors from "../../middlewares/asyncErrors.js";
import Product from "../../models/Product.js";
import ErrorHandler from "../../utils/errorHandler.js";

export const deleteProduct = asyncErrors(async(req, res, next) =>{
  const product = await Product.findById(req?.params?.id);

  if(!product){
    return next(new ErrorHandler("Product Not Found", 404));
  }

  const folderPath = product.images.length > 1 ? `Products/${product.name}` : "Products";

  try{
    const deletePromises = product.images.map(image =>
      delete_file(image.public_id)
    );
    await Promise.all(deletePromises);
    
    if(product.images.length > 1){ // Handles product images deletion
      await cloudinary.api.delete_folder(folderPath);
    }

    await product.deleteOne();
    res.status(200).json({ message: "Delete Succeed" });
  }
  catch(error){
    return next(new ErrorHandler(`Failed to delete images/folder: ${error.message}`, 500));
  }
});