const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
});

userSchema.methods.comparePassword = (candidatePassword, password) => {
  return bcrypt.compare(candidatePassword, password)
};

module.exports = User = mongoose.model("User", userSchema);
