const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userController = require("../controllers/userController");
require("dotenv").config();

router.get("/", userController.getAllUser);
router.post("/", userController.signUpUser);
module.exports = router;
