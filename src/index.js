const express = require('express');
const app = express();
const { listContacts, getById, addContact, removeContact, updateContact } = require('./services.js');
const bodyParser = require('body-parser');
const connectDb = require('./connection/mongoose');

app.use(bodyParser.json());


const port = 8081;

const startServer = () => {
  app.listen(port, () => console.log(`App started on port ${port}`));
};

connectDb()
  .on('error', console.log)
  .on('disconnected', connectDb)
  .once('open', startServer);

app.get('/contacts', async (req, res) => {
  const contacts = await listContacts();
  res.send(contacts);
});

app.get('/contacts/:id', async (req, res) => {
  const contact = await getById(req.params.id);
  if (contact) {
    res.status(200).send(contact);
    return;
  }
  res.status(400).send({"message": "Contact not found"});
});

app.post('/contacts', async (req, res) => {
  if (['name', 'email', 'phone'].every(k => req.body[k])) {
    const contact = await addContact(req.body);
    res.status(201).send(contact);
    return;
  }
  res.status(400).send({"message" : "missing required name field"});
});

app.delete('/contacts/:id', async (req, res) => {
  const contact = await removeContact(req.params.id);
  if (contact) {
    res.status(200).send({"message": "Contact deleted"});
    return;
  }
  res.status(404).send({"message": "Contact not found"});
});

app.patch('/contacts/:id', async (req, res) => {
  if (['name', 'email', 'phone'].some(k => req.body[k])) {
    const contact = await updateContact(req.params.id, req.body);
    if (contact) {
      res.status(200).send(contact);
      return;
    }
    res.status(400).send({"message" : "Contact not found"});
    return;
  }
  res.status(400).send({"message": "Missing fields"});
});
