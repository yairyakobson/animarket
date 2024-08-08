import mime from "mime-types";

import { delete_file, upload_file } from "../../utils/aws.js";

import asyncErrors from "../../middlewares/asyncErrors.js";
import User from "../../models/User.js";

export const updateUser = asyncErrors(async(req, res, next) =>{
  const newUser ={
    name: req.body.name,
    email: req.body.email,
  }
 
  if(req.body.picture !== ""){
    const buffer = Buffer.from(req.body.picture.split(",")[1], "base64");
    const mimeType = req.body.picture.match(/^data:(image\/\w+);base64,/)[1];
    const extension = mime.extension(mimeType);
    const fileName = `${req.body.email.split("@")[0]}.${extension}`; // Using email prefix as the filename

    const newPicture = await upload_file({
      buffer,
      name: fileName,
      mimeType,
    }, "Profile_Pictures");
 
    newUser.picture ={
      public_id: newPicture.public_id,
      url: newPicture.url,
      signed_url: newPicture.signed_url
    }

    if(req?.user?.picture?.public_id){
      await delete_file(req.user.picture.public_id);
    };
  }

  const user = await User.findByIdAndUpdate(req.user._id, newUser, { new: true });
 
  res.status(200).json({ user });
});