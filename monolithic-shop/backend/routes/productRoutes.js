const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Product = require('../models/Product');

const router = express.Router();

// Adăugare produs (protejată)
router.post('/add',  async (req, res) => {
  const { name, description, price, stock } = req.body;

  console.log("Adding product")
  try {
    const product = await Product.create({ name, description, price, stock });
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (err) {
    console.log("Error when Adding product")
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Obține lista de produse
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
