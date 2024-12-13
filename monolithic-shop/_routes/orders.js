const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Route to create a new order
router.post('/create', async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.send(order);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Route to fetch a specific order by ID
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (order) res.send(order);
        else res.status(404).send('Order not found');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Route to fetch all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.send(orders);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
