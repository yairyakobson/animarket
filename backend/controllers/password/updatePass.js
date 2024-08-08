import { updatePasswordMail } from "../../utils/emailTemplates/updatePassword.js";

import User from "../../models/User.js";
import asyncErrors from "../../middlewares/asyncErrors.js";
import ErrorHandler from "../../utils/errorHandler.js";
import sendToken from "../../utils/jwtToken.js";
import sendEmail from "../../utils/sendEmail.js";

export const updatePassword = asyncErrors(async(req, res, next) =>{
  const user = await User.findById(req?.user?._id).select("+password");
  const isMatchedPass = await user.comparePassword(req.body.oldPassword);
  
  if(!isMatchedPass){
    return next(new ErrorHandler("Old Password Is Incorrect", 400));
  }

  if(req.body.oldPassword === req.body.password){
    return next(new ErrorHandler("New password must be different", 400));
  }

  const message = updatePasswordMail(user?.name);

  try{
    await sendEmail({
      email: user.email,
      subject: "Animarket Password Update",
      message
   });
   res.status(200).json({
     success: true,
     message: `The Email has been sent to: ${user.email}`
   });
  }
  catch(error){
    await user.save();
    user.password = req.body.password;
    return next(new ErrorHandler(error?.message, 500));
  }
  sendToken(user, 200, res);
});