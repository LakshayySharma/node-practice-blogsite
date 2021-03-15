const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const userController = require("../controllers/userController");
require("dotenv").config();

router.get("/", userController.getAllUser);
router.get("/:id", userController.getOneUser);
router.post("/signup", userController.signUpUser);
router.post("/login", userController.logInUser);
// router.get("/blog", auth, (req, res, next) => {
//   try {
//     res.json({
//       message: "Access granted",
//     });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });
module.exports = router;
