import Order from "../models/Order.js";

export const createOrder = async(orderData) =>{
  return await Order.create(orderData);
}

export const getOrder = async(query) =>{
  return await Order.findById(query).populate("user", "name email");
}

export const getUserOrders = async(query) =>{
  return await Order.find(query);
}

export const getAllOrders = async() =>{
  return await Order.find();
}

export const updateOrderStatus = async(query) =>{
  return await Order.findById(query);
}

export const deleteExistingOrder = async(query) =>{
  return await Order.findById(query);
}