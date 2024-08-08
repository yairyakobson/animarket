import { upload_file } from "../../utils/cloudinary.js";
import { productCreationMail } from "../../utils/emailTemplates/productCreation.js";

import asyncErrors from "../../middlewares/asyncErrors.js";
import Product from "../../models/Product.js";
import ErrorHandler from "../../utils/errorHandler.js";
import sendEmail from "../../utils/sendEmail.js";

export const newProduct = asyncErrors(async(req, res, next) =>{
  let productImage = [];
  const productWithOutImages = { ...req.body, images: productImage };
  const product = await Product.create(productWithOutImages);

  if(!productImage){
    return next(new ErrorHandler("Product not found", 404));
  };
  try{
    const uploader = async(image) => upload_file(image, req.body.images.length > 1 ? `Products/${product.name}` : "Products");
    const urls = await Promise.all((req?.body?.images).map(uploader));
    product?.images?.push(...urls);
    await product?.save();
    res.status(200).json({ product });

    const user = req.user;
    const emailOptions = {
      email: user?.email,
      subject: 'New Product Created',
      message: productCreationMail(user?.name, product?.name, productWithOutImages, product?.images)
    };
    await sendEmail(emailOptions);
  }
  catch(error){
    return next(new ErrorHandler(`Operation Failed: ${error.message}`, 500));
  };
});