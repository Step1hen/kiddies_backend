const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(`${process.env.CONNECTION_STRING}`);
    console.log(
      "Mongo DB connected successfully: ",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log("Error connecting to the mongo DB: " + err);
    process.exit(1);
  }
};

module.exports = connectDb;
