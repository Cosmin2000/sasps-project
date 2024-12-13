const { Sequelize } = require('sequelize');

// Initialize SQLite database connection
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

// Test connection
sequelize.authenticate()
    .then(() => console.log('SQLite database connected!'))
    .catch((err) => console.error('Unable to connect to SQLite:', err));

module.exports = sequelize;