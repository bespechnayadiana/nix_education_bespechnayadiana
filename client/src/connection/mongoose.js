const mongoose = require("client/src/connection/mongoose");

const username = encodeURIComponent("Root");
const password = encodeURIComponent("12345");
const cluster = "cluster0.fxw36vt.mongodb.net";

const connectDb = () => {
  const mongoDB = `mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority`;
  mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
  return mongoose.connection;
};

module.exports = connectDb;
