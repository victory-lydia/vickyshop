import dotenv, { config } from "dotenv";
import cloudinaryModule from "cloudinary";

const formData = new FormData();
formData.append("upload_preset", "onlineshop");
// data.append("file", file);
formData.append("cloud_name", "Peculiar");

dotenv.config();
const cloudinary = cloudinaryModule.v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,

  method: "POST",
  data: formData,
});

const imgurl = "https://res.cloudinary.com/peculiar/image/onlineshop/Peculiar";

fetch(imgurl, config).then((responseData) => {
  console.log(JSON.stringify(responseData, null, 4));
});

export default cloudinary;
