const express = require ('express');
const cors = require("cors");


const products = require("./product");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) =>{
    res.send("Welcome to VICKY'S SHOP API...")
});

app.get("/products", (req, res) =>{
    res.send(products);
});

app.listen(5000, console.log("Server up and running"))