const fs = require('fs');
const path = require('path');
const Contacts = require("./models/contacts");


const listContacts = () => {
  return Contacts.find({});
};

const getById = (id) => {
  return Contacts.findOne({ _id: id });
};

const addContact = async (body) => {
  const contact = new Contacts(body);
  await contact.save();
  return contact;
};

const removeContact = (id) => {
  return Contacts.findOneAndDelete({ _id: id });
};

const updateContact = (id, body) => {
  return Contacts.findOneAndUpdate({ _id: id }, body, { new: true });
};

const seedContacts = async () => {
  const data = fs.readFileSync(path.join(__dirname, 'contacts.json'));
  await Promise.all(JSON.parse(data).map(addContact));
  console.log('Contacts seeded!');
};

module.exports = {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
  seedContacts
};
