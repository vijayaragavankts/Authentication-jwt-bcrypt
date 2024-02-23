const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const generateToken = require("../config/generateToken");

router.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      return res.status(500).json({
        success: false,
        message: "Enter all the required fields for register",
      });
    }
    const customer = await User.findOne({ name: name });
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "User with the entered username not present in db",
      });
    }
    const passwordMatch = await bcrypt.compare(password, customer.password);
    if (!passwordMatch) {
      return res.status(500).json({
        success: false,
        message: "Entered username or password is wrong",
      });
    }
    return res.status(200).json({
      token: generateToken(customer._id),
    });
  } catch (err) {
    res.status(200).json({
      type: "error",
      message: "Error in login",
      data: err.message,
    });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(500).json({
        success: false,
        message: "Enter all the required fields for register",
      });
    }
    const customer = await new User({ name, email, password });
    await customer.save();

    return res.status(200).json({
      token: generateToken(customer._id),
    });
  } catch (err) {
    res.status(200).json({
      type: "error",
      message: "Error in Register",
    });
  }
});

module.exports = router;
