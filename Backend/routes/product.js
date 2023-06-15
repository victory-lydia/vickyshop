import express from "express";
import cloudinary from "../utils/cloudinary.js";
import Products from "../models/products.js";

const router = express.Router();

// CREATE

router.post("/", async (req, res) => {
  const { name, desc, price, image } = req.body;

  try {
    if (image) {
      const uploadRes = await cloudinary.uploader.upload(image, {
        upload_preset: "vickyshop",
      });

      if (uploadRes) {
        const product = new Products({
          name,
          desc,
          price,
          image: uploadRes,
        });

        const savedProduct = await product.save();

        req.statusCode(200).send(savedProduct);
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
