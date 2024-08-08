import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.PRIMARY_AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

export const upload_file = async(file, folder) =>{
  const keyDirectory = `${folder}/${Date.now()}_${file.name}`
  const params = {
    Bucket: process.env.PRIMARY_BUCKET,
    Key: keyDirectory,
    Body: file.buffer,
    ContentType: file.mimeType,
    ContentDisposition: "inline", // Ensure the image is displayed in the browser
  }

  try{
    const command = new PutObjectCommand(params);
    const data = await s3Client.send(command);

    const signedUrlParams = {
      Bucket: process.env.PRIMARY_BUCKET,
      Key: keyDirectory,
      Expires: 60 * 5
    };
    const signedUrl = await getSignedUrl(
      s3Client, new GetObjectCommand(signedUrlParams),
      { expiresIn: 60 * 5 }
    );

    return{
      public_id: keyDirectory,
      url: `https://${process.env.PRIMARY_BUCKET}.s3.${process.env.PRIMARY_AWS_REGION}.amazonaws.com/${keyDirectory}`,
      signed_url: signedUrl
    };
  }
  catch(error){
    throw new Error(`Failed to upload file: ${error.message}`);
  }
}

export const delete_file = async(file) =>{
  const params = {
    Bucket: process.env.PRIMARY_BUCKET,
    Key: file
  };

  try{
    const command = new DeleteObjectCommand(params);
    await s3Client.send(command);
    return true;
  }
  catch(error){
    console.error("Error deleting file:", error);
    throw new Error("Failed to delete file");
  }
};