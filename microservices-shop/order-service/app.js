const express = require('express');
const Order = require('./models/Order');

const app = express();
app.use(express.json());

// Create a new order
app.post('/create', async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.status(201).send(order);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Get order by ID
app.get('/:id', async (req, res) => {
    const order = await Order.findByPk(req.params.id);
    if (order) {
        res.send(order);
    } else {
        res.status(404).send({ error: 'Order not found' });
    }
});

const PORT = 5003;
app.listen(PORT, () => console.log(`Order Service running on port ${PORT}`));
