const mongoose = require("mongoose");

module.exports.dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("database established successfully ");
  } catch (error) {
    console.log("database connection error:", error);
  }
};
