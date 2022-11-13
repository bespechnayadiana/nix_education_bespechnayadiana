const express = require('express');
const router  = express.Router();

const { searchProducts } = require('../services/products');

router.get('/', async (req, res) => {
  const products = await searchProducts(req.query.search);

  res.status(200).json(products);
});

module.exports = router;
