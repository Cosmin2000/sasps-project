const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const PORT = 4002;

// Middleware
app.use(express.json());

// Database setup
const sequelize = new Sequelize('product_db', 'user', 'password', {
    dialect: 'sqlite',
    storage: './product.db',
});

// Models
const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
});

// Sync database
sequelize.sync({ force: false }).then(() => {
    console.log('Product database synced');

    // Add default products
    Product.bulkCreate([
        { name: 'Laptop', description: 'High performance laptop', price: 1200.5 },
        { name: 'Smartphone', description: 'Latest model smartphone', price: 799.99 },
        { name: 'Headphones', description: 'Noise-cancelling headphones', price: 199.99 },
    ]);
});

// Routes
app.get('/products', async (req, res) => {
    const { name, price, sort } = req.query;

    const where = {};
    if (name) where.name = { [Sequelize.Op.like]: `%${name}%` };
    if (price) where.price = { [Sequelize.Op.lte]: price };

    const products = await Product.findAll({
        where,
        order: sort ? [['price', sort.toLowerCase() === 'desc' ? 'DESC' : 'ASC']] : [],
    });

    res.json(products);
});

// Start server
app.listen(PORT, () => console.log(`Product Service running on port ${PORT}`));
