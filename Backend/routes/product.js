import express, { json, urlencoded } from "express";
import cloudinary from "../utils/cloudinary.js";
import Products from "../models/products.js";
import bodyParser from "body-parser";

const router = express.Router();
const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

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

        res.statusCode(200).send(savedProduct);
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
