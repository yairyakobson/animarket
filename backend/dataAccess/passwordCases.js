import User from "../models/User.js";

export const findUserPassword = async(query) =>{
  return await User.findOne(query);
}

export const resetUserPassword = async(query) =>{
  return await User.findOne(query);
}

export const updateResettedPassword = async(query) =>{
  return await User.findById(query).select("+password");
}