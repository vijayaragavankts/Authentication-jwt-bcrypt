const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoute");
const secretRouter = require("./routes/secretRoute");
const protectUser = require("./middleware/protectUser");

const app = express();

mongoose
  .connect("mongodb://localhost:27017/authentication-demo")
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Home");
});

app.use("/", userRouter);

app.use("/secret", protectUser, secretRouter);

app.listen(5000, () => {
  console.log("Server Started in PORT 5000");
});
