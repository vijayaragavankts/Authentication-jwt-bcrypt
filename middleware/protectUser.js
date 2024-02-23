const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const protectUser = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
      console.log("Error in token of jwt");
      return res.status(400).json({
        msg: "Error in jwt verificatiopn",
      });
    }
    const decoded = jwt.verify(token, "secret");
    const client = await User.findById(decoded.id);
    if (client) {
      next();
    }
  } catch (err) {
    console.log(err.message);
    console.log("Error Occured in jwt verification");
  }
};

module.exports = protectUser;
