import { delete_file, upload_file } from "../../utils/aws.js";
import { updateSingleProduct } from "../../dataAccess/productCases.js";

import asyncErrors from "../../middlewares/asyncErrors.js";
import Product from "../../models/Product.js";
import ErrorHandler from "../../utils/errorHandler.js";

export const updateProduct = asyncErrors(async(req, res, next) =>{
  let product = await updateSingleProduct(req.params.id);
  let productImage = req.body.images;
  
  if(!product){
    return next(new ErrorHandler("Product Not Found", 404));
  };
  
  if(!productImage){
    return next(new ErrorHandler("Product not found", 404));
  };

  for(let i = 0; i < product.images.length; i++){
    await delete_file(product.images[i].public_id);
  };

  const uploader = async(image) =>{
    const buffer = Buffer.from(image.split(",")[1], "base64");
    const mimeType = image.match(/^data:(image\/\w+);base64,/)[1];
    const folder = productImage.length > 1 ? `Products/${product.seller}_${product.name}` : "Products";
    const extension = mimeType.split('/')[1];
    const fileName = `${product.seller}_${product.name}_${product._id}.${extension}`;

    return upload_file({
      buffer,
      name: fileName,
      mimeType: mimeType,
    }, folder);
  };

  const urls = await Promise.all(productImage.map(uploader));
  const productWithNewImages = { ...req.body, images: urls };
  product = await Product.findByIdAndUpdate(req.params.id, productWithNewImages, { new: true });
  
  res.status(200).json({ product });
});