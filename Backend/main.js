import express, { json, request } from "express";
import cors from "cors";
import mongoose from "mongoose";
// import "../Backend/config.js";

import products from "./product.js";

const app = express();
const env = require.env;

// require("dotenv").config();

import dotenv from "dotenv";
dotenv.config();
env.config();

app.use(json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to VICKY'S SHOP API...");
});

app.get("/products", (req, res) => {
  res.send(products);
});

const port = process.env.PORT || 5000;
const uri = process.env.DB_URI;

app.listen(5000, console.log("Server up and running"));

// connecting the mongodb

mongoose
  .connect(uri, {
    useNewURLParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection succesful..."))
  .catch((err) => console.log("MongoDB connection failed", err.message));
