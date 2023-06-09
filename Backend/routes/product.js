import express, { json, urlencoded } from "express";
import cloudinary from "../utils/cloudinary.js";
import Products from "../models/products.js";
import cors from "cors";
import multer from "multer";
import { isAdmin } from "../middleware/auth.js";

const router = express.Router();
const app = express();

// CREATE

router.post("/", isAdmin, async (req, res) => {
  const { name, desc, price, image } = req.body;

  try {
    if (image) {
      const uploadRes = await cloudinary.uploader.upload(image, {
        upload_preset: "onlineshop",
      });

      if (uploadRes) {
        const product = new Products({
          name,
          desc,
          price,
          image,
        });

        const savedProduct = await product.save();

        res.status(200).send(savedProduct);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Products.find();
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default router;
