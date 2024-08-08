import mime from "mime-types";

import { upload_file } from "../../utils/aws.js";
import { productCreationMail } from "../../utils/emailTemplates/productCreation.js";

import asyncErrors from "../../middlewares/asyncErrors.js";
import Product from "../../models/Product.js";
import ErrorHandler from "../../utils/errorHandler.js";
import sendEmail from "../../utils/sendEmail.js";

export const newProduct = asyncErrors(async (req, res, next) =>{
  const { images, ...productData } = req.body;

  const uploader = async(base64Image, index, productData) =>{
    const mimeTypeMatch = base64Image.match(/data:([^;]+);base64/);

    if(!mimeTypeMatch){
      return next(new ErrorHandler("Invalid image format", 400));
    };

    const buffer = Buffer.from(base64Image.split(",")[1], "base64");
    const mimeType = mimeTypeMatch[1];
    const folder = images.length > 1 ? `Products/${productData.seller}_${productData.name}` : "Products";
    const extension = mime.extension(mimeType);
    const fileName = `${index}.${extension}`;

    return upload_file({
      buffer,
      name: fileName,
      mimeType: mimeType,
    }, folder);
  };

  try{
    // Upload images
    const uploadPromises = images.map((image, index) => uploader(image, index, productData));
    const uploadedImages = await Promise.all(uploadPromises);

    // Create product with uploaded image URLs
    const productImage = uploadedImages.map(image =>({
      public_id: image.public_id,
      url: image.url,
      signed_url: image.signed_url
    }));

    const newProductData = { ...productData, images: productImage };
    const product = await Product.create(newProductData);
    res.status(200).json({ product });

    // Send email notification
    const user = req.user;
    const emailOptions = {
      email: user.email,
      subject: 'New Product Created',
      message: productCreationMail(user.name, product.name, productData, product.images)
    };
    await sendEmail(emailOptions);
  }
  catch(error){
    return next(new ErrorHandler(`Operation Failed: ${error.message}`, 500));
  };
});