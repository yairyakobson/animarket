import { createOrder } from "../../dataAccess/orderCases.js";
import asyncErrors from "../../middlewares/asyncErrors.js";

export const newOrder = asyncErrors(async(req, res, next) =>{
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentMethod,
    paymentInfo
  } = req.body

  const order = await createOrder({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paymentMethod,
    paymentDate: Date.now(),
    user: req.user._id
  });

  res.status(200).json(order);
});