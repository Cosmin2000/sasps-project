const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const PORT = 4003;

// Middleware
app.use(express.json());

// Database setup
const sequelize = new Sequelize('cart_db', 'user', 'password', {
    dialect: 'sqlite',
    storage: './cart.db',
});

// Models
const CartItem = sequelize.define('CartItem', {
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

// Sync database
sequelize.sync({ force: false }).then(() => console.log('Cart database synced'));

// Routes
app.post('/cart', async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        const cartItem = await CartItem.create({ productId, quantity });
        res.status(201).json({ message: 'Product added to cart', cartItem });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add product to cart' });
    }
});

app.get('/cart', async (req, res) => {
    const cartItems = await CartItem.findAll();
    res.json(cartItems);
});

// Start server
app.listen(PORT, () => console.log(`Cart Service running on port ${PORT}`));
