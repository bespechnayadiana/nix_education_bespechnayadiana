const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Product = new Schema({
  category: { type: String },
  imgUrl: { type: String },
  name: { type: String },
  display: { type: Number },
  color: [String],
  price: { type: Number },
  chip: {
    name: { type: String },
    cores: { type: Number },
  },
  ram: { type: Number },
  storage: { type: Number },
  touchId: { type: Boolean },
  faceId: { type: Boolean },
  wireless: [String],
  camera: {
    front: { type: String },
    back: { type: String },
  },
  audio: {
    microphone: { type: String },
    speakers: { type: String },
  },
  size: {
    height: { type: String },
    width: { type: String },
    depth: { type: String },
    weight: { type: String },
  },
  os: { type: String },
  InTheBox: [String],
  orderInfo: {
    inStock: { type: Number },
    reviews: { type: Number },
  }
});

module.exports = mongoose.model('Product', Product);
