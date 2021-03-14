const { urlencoded } = require("express");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const userRouter = require("./routes/userRoutes");
const connection = require("./db");
require("dotenv").config();

app.use(express.json(urlencoded({ extended: true })));

connection();

app.use("/api/user", userRouter);

app.listen(process.env.PORT, (req, res, next) => {
  console.log(`Server started at port 5000`);
});
