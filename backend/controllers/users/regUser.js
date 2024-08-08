import { upload_file } from "../../utils/aws.js";

import asyncErrors from "../../middlewares/asyncErrors.js";
import User from "../../models/User.js";
import sendToken from "../../utils/jwtToken.js";

export const regUser = asyncErrors(async(req, res, next) =>{
  const { name, email, password, picture } = req.body;

  const buffer = Buffer.from(picture.split(",")[1], "base64");
  const mimeType = picture.match(/^data:(image\/\w+);base64,/)[1];
  const extension = mimeType.split('/')[1];
  const fileName = `${email.split("@")[0]}.${extension}`; // email prefix is the filename with the extension
  // const fileName = `${name}.${extension}`; // Usersname is the filename with the extension

  const result = await upload_file({
    buffer,
    name: fileName,
    mimeType: mimeType,
  }, "Profile_Pictures");
  
  const user = await User.create({
    name,
    email,
    password,
    picture: {
      public_id: result.public_id,
      url: result.url,
      signed_url: result.signed_url
    }
  });
  sendToken(user, 201, res);
});