import asyncErrors from "../../middlewares/asyncErrors.js";
import { deleteExistingOrder } from "../../dataAccess/orderCases.js";
import ErrorHandler from "../../utils/errorHandler.js";

export const deleteOrder = asyncErrors(async(req, res, next) =>{
  const order = await deleteExistingOrder(req.params.id);

  if(!order){
     return next(new ErrorHandler("No order found with this ID", 404));
  }
  await order.deleteOne();
  
  res.status(200).json({
      message: "Order deleted"
  });
});