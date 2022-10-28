const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Contacts = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
});

// Export model
module.exports = mongoose.model("Contacts", Contacts);
