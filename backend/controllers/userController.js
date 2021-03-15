const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
exports.getAllUser = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json({ users: users });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

exports.getOneUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

exports.signUpUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (!user) {
      user = await new User(req.body);
      user.password = await bcrypt.hash(password, 12);
      await user.save();
      const payload = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(payload, process.env.JWTSECRET, {
        expiresIn: "3d",
      });
      res.status(200).json({
        token: token,
      });
    } else {
      return res.status(400).json({
        message: "User already exists",
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

exports.logInUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );
    if (!user) {
      return res.status(400).json({
        message: "Sorry!! User not found",
      });
    }
    let correctUser = await user.comparePassword(
      req.body.password,
      user.password
    );
    if (correctUser) {
      const payload = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(payload, process.env.JWTSECRET, {
        expiresIn: "3d",
      });
      res.status(200).json({
        token: token,
      });
    } else {
      return res.status(400).json({
        message: "Incorrect email or password",
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
