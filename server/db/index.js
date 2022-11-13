const mongoose = require('mongoose');

const username = encodeURIComponent(process.env.DB_NAME);
const password = encodeURIComponent(process.env.DB_PASSWORD);
const cluster = process.env.DB_CLUSTER;

const connectDb = () => {
  const mongoDB = `mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority`;
  mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
  return mongoose.connection;
};

module.exports = connectDb;
