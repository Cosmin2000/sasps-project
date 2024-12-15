const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const sequelize = require('./db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conectare și sincronizare baza de date
sequelize
  .sync()
  .then(() => console.log('Database synchronized'))
  .catch((err) => console.error('Error syncing database:', err));

// Rute
app.use('/auth', authRoutes);

// Adaugă rutele produselor
app.use('/products', productRoutes);


// Pornirea serverului
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));