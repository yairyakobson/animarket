import { delete_file } from "../../utils/aws.js";

import asyncErrors from "../../middlewares/asyncErrors.js";
import Product from "../../models/Product.js";

export const deleteProduct = asyncErrors(async(req, res, next) =>{
  const product = await Product.findById(req.params.id);

  for(let i = 0; i < product.images.length; i++){
    const filePath = product.images[i].public_id;
    await delete_file(filePath);
  }

  await product.deleteOne();
  res.status(200).json({ message: "Delete Succeed" });
});