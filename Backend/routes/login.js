import bcrypt from "bcrypt";
import express from "express";
import Joi from "joi";
import User from "../models/user.js";
import genAuthToken from "../utils/genAuthToken.js";

const register = express.Router();

register.post("/", async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(6).max(200).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).send("Invalid email or password...");

  const isValid = await bcrypt.compare(req.body.password, user.password);

  if (!isValid) return res.status(400).send("User already exist...");

  const token = genAuthToken(user);

  res.send(token);
});

export default register;
