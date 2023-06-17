import dotenv, { config } from "dotenv";
import cloudinaryModule from "cloudinary";

const data = new FormData();
data.append("upload_preset", "onlineshop");
// data.append("file", file);
data.append("cloud_name", "Peculiar");

dotenv.config();
const cloudinary = cloudinaryModule.v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,

  method: "POST",
  body: formData,
});

const imgurl = "https://res.cloudinary.com/peculiar/image/onlineshop/Peculiar";

fetch(imgurl, config).then((responseData) => {
  console.log(JSON.stringify(responseData, null, 4));
});

// fetch(`https://api.cloudinary.com/v1_1/Peculiar/image/upload`, {});

export default cloudinary;
