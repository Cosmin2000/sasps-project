const express = require('express');
const Product = require('./models/Product');

const app = express();
app.use(express.json());

// Add a new product
app.post('/add', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Get all products
app.get('/', async (req, res) => {
    const products = await Product.findAll();
    res.send(products);
});

const PORT = 5002;
app.listen(PORT, () => console.log(`Product Service running on port ${PORT}`));
