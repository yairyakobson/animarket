import asyncErrors from "../../middlewares/asyncErrors.js";
import User from "../../models/User.js";
import ErrorHandler from "../../utils/errorHandler.js";
import sendToken from "../../utils/jwtToken.js"

export const logUser = asyncErrors(async(req, res, next) =>{
  const { email, password } = req.body;

  if(!email || !password){
    return next(new ErrorHandler("Please enter Email and/or Password", 400));
  };

  const user = await User.findOne({ email }).select("+password");
  
  if(!user){
    return next(new ErrorHandler("Invalid Email and/or Password", 401));
  };

  const isMatch = await user.comparePassword(password);

  if(!isMatch){
    return next(new ErrorHandler("Invalid Email and/or Password", 401));
  };

  sendToken(user, 200, res);
});