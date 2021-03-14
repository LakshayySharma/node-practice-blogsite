const { urlencoded } = require("express");
const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes");

app.use(express.json(urlencoded({ extended: true })));

app.use("/api/user", userRouter);

app.listen("5000", (req, res, next) => {
  console.log(`Server started at port 5000`);
});
