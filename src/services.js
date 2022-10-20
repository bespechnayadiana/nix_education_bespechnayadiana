const fs = require('fs');
const path = require('path');

const listContacts = () => {
  const data = fs.readFileSync(path.join(__dirname, 'contacts.json'));
  return JSON.parse(data);
};

const getById = (id) => {
  const contacts = listContacts();
  return contacts.find((c) => c.id.toString() === id);
};

const addContact = (body) => {
  const contacts = listContacts();
  const contact = {...body, id: Date.now()};
  contacts.push(contact);
  fs.writeFileSync(path.join(__dirname, 'contacts.json'), JSON.stringify(contacts, 2, 2));
  return contact;
};

const removeContact = (id) => {
  const contacts = listContacts();
  const index = contacts.findIndex((c) => c.id.toString() === id);
  if (index < 0) return null;
  const d = contacts.splice(index, 1);
  fs.writeFileSync(path.join(__dirname, 'contacts.json'), JSON.stringify(contacts, 2, 2));
  return d;
};

const updateContact = (id, body) => {
  const contacts = listContacts();
  const index = contacts.findIndex((c) => c.id.toString() === id);
  if (index < 0) return null;
  contacts[index] = {...contacts[index], ...body};
  fs.writeFileSync(path.join(__dirname, 'contacts.json'), JSON.stringify(contacts, 2, 2));
  return contacts[index];
};

module.exports = {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact
};
