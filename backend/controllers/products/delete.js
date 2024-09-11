import { delete_file } from "../../utils/aws.js";
import { deleteSingleProduct } from "../../dataAccess/productCases.js";

import asyncErrors from "../../middlewares/asyncErrors.js";

export const deleteProduct = asyncErrors(async(req, res, next) =>{
  const product = await deleteSingleProduct(req.params.id);

  for(let i = 0; i < product.images.length; i++){
    const filePath = product.images[i].public_id;
    await delete_file(filePath);
  }

  await product.deleteOne();
  res.status(200).json({ message: "Delete Succeed" });
});