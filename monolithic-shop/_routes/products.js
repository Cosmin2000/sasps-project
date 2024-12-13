const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.post('/add', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.send(product);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.send(products);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;

