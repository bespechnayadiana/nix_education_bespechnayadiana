const ProductModel = require('../models/product');
const items = require('../items');

const searchProducts = (s = '') => ProductModel.find({ name: { $regex: s, $options: 'i' } });

const addProduct = async (p) => {
  const contact = new ProductModel(p);
  await contact.save();
  return contact;
};

const seedProducts = async () => {
  await ProductModel.deleteMany({}).exec();
  await Promise.all(items.map(addProduct));
  console.log('Contacts seeded!');
};

module.exports = {
  searchProducts,
  seedProducts
};
