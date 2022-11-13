const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

require('dotenv').config();

// const { listContacts, getById, addContact, removeContact, updateContact } = require('./services.js');
const connectDb = require('./db');
const auth = require('./routes/auth');
const product = require('./routes/product');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

app.use('/auth', auth);
app.use('/product', passport.authenticate('jwt', {session: false}), product);

const startServer = () => {
  app.listen(port, () => console.log(`App started on port ${port}`));
};

connectDb()
  .on('error', console.log)
  .on('disconnected', connectDb)
  .once('open', startServer);

