const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Sequelize, DataTypes } = require('sequelize');
const { register, collectDefaultMetrics, Histogram, Counter } = require('prom-client');

const app = express();
const PORT = 4001;

// Middleware
app.use(express.json());

// Prometheus metrics
collectDefaultMetrics(); // Metrici default despre CPU, RAM etc.

// Custom metrics
const requestCounter = new Counter({
  name: 'http_requests_total',
  help: 'Number of requests received TEST',
  labelNames: ['method', 'route', 'status'],
});

const responseTimeHistogram = new Histogram({
  name: 'http_response_time_seconds',
  help: 'Response time in seconds TEST',
  labelNames: ['method', 'route', 'status'],
});

const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds TEST',
  labelNames: ['method', 'route', 'status'],
});

register.registerMetric(httpRequestDuration);
register.registerMetric(requestCounter);
register.registerMetric(responseTimeHistogram);


// Middleware pentru masurarea metricilor
app.use((req, res, next) => {
  const start = Date.now();
  const end = httpRequestDuration.startTimer({ method: req.method, route: req.route ? req.route.path : req.path });
  res.on('finish', () => {
    end({ status: res.statusCode });
    const duration = (Date.now() - start) / 1000;
    requestCounter.inc({ method: req.method, route: req.path, status: res.statusCode });
    responseTimeHistogram.observe({ method: req.method, route: req.path, status: res.statusCode }, duration);
  });
  next();
});


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
  
  User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
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

    console.log(password)
    console.log(user.password)
    // Verificare parolă
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(isMatch)
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generare token JWT
    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});


// Start server
app.listen(PORT, () => console.log(`Auth Service running on port ${PORT}`));
