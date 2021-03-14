const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("dotenv").config();

const connection = async () => {
  try {
    await mongoose.connect(
      process.env.MONGOURI,
      {
        useCreateIndex: true,
        useFindAndModify: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => {
        console.log(`Mongo DB connection successful`);
      }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = connection;
