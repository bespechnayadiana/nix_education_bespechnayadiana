require('dotenv').config();

const { seedProducts } = require('./services/products');
const connectDb = require('./db');

const connection = connectDb()
  .on('error', console.log)
  .once('open', async () => {
    await seedProducts();
    connection.close();
  });
