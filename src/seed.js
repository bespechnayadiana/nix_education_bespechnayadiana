const { seedContacts } = require('./services.js');
const connectDb = require('./connection/mongoose');

const connection = connectDb()
  .on('error', console.log)
  .once('open', async () => {
    await seedContacts();
    connection.close();
  });
