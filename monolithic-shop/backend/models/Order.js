const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../db');

const Order = sequelize.define('Order', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    products: {
        type: DataTypes.JSON, // JSON to store product details
        allowNull: false,
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }
});

module.exports = Order;

