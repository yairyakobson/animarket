import "dotenv/config";
import { google } from "googleapis";
import nodemailer from "nodemailer";

const OAuth2 = google.auth.OAuth2; // creates a new instance of the OAuth2 client from the Google APIs library

const createTransporter = async() =>{ // Returns a Nodemailer transporter object
  try{
    const oauth2Client = new OAuth2( // Creates a new OAuth2 object using the client ID, client secret and redirect URL
      process.env.OAUTH_CLIENT_ID,
      process.env.OAUTH_CLIENT_SECRET,
      "https://developers.google.com/oauthplayground" // Redirect URL
    );
  
    oauth2Client.setCredentials({ // Setting credentials for the OAuth2 client
      refresh_token: process.env.OAUTH_REFRESH_TOKEN // Using the refresh token to obtain a new access token 
    });
  
    const accessToken = await new Promise((resolve, reject) =>{
      oauth2Client.getAccessToken((err, token) =>{ // Creates a new access token when the current one is expired
        if(err){
          console.log("*Error: ", err)
          reject();
        }
        resolve(token); 
      });
    });
  
    const transporter = nodemailer.createTransport({ // Creates the Nodemailer Transporter
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.GMAIL_ACCOUNT,
        accessToken,
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
      }
    });
    return transporter;
  }
  catch(error){
    return error
  }
}

// The sent email structure
const sendEmail = async(options) =>{
  try{
    const message = {
      from: `${process.env.SENDER} <${process.env.SENDER_EMAIL}>`,
      to: options.email,
      subject: options.subject,
      html: options.message
    }
    let emailTransporter = await createTransporter();
    await emailTransporter.sendMail(message);
  }
  catch(error){
    console.log("Error: ", error)
  }
};

export default sendEmail;