import Order from "../models/Order.js";

export const stripeOrder = async(orderData) =>{
  return await Order.create(orderData);
}