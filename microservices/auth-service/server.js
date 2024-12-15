const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const PORT = 4001;

// Middleware
app.use(express.json());

// Database setup
const sequelize = new Sequelize('auth_db', 'user', 'password', {
    dialect: 'sqlite',
    storage: './auth.db',
});

// Models
const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  

// Sync database
sequelize.sync({ force: false }).then(() => console.log('Auth database synced'));

// Routes
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    console.log("Register");
  try {
    // Verificare existență utilizator
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        console.log("'User already exists'")
      return res.status(400).json({ message: 'User already exists' });
    }

    // Creare utilizator
    const user = await User.create({ name, email, password });
    console.log("'User registered successfully'");
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.log("'Server error");
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Găsire utilizator
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verificare parolă
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generare token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start server
app.listen(PORT, () => console.log(`Auth Service running on port ${PORT}`));
