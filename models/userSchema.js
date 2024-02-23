const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    requried: true,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const hashedpw = await bcrypt.hash(this.password, 10);
  this.password = hashedpw;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
