const express = require('express');
const path = require('path');
const sequelize = require('./models');
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

const app = express();
app.use(express.json());

// Sync database
sequelize.sync()
    .then(() => console.log('Database synced!'))
    .catch((err) => console.error('Error syncing database:', err));

// API routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all route to serve React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
