const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const { register, collectDefaultMetrics, Histogram, Counter } = require('prom-client');



const app = express();
const PORT = 4002;

// Middleware
app.use(express.json());

// Prometheus metrics
collectDefaultMetrics(); // Metrici default despre CPU, RAM etc.

// Custom metrics
const requestCounter = new Counter({
  name: 'http_requests_total',
  help: 'Number of requests received',
  labelNames: ['method', 'route', 'status'],
});

const responseTimeHistogram = new Histogram({
  name: 'http_response_time_seconds',
  help: 'Response time in seconds',
  labelNames: ['method', 'route', 'status'],
});

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
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  
// Sync database
sequelize.sync({ force: false }).then(() => {
    console.log('Product database synced');

    // Add default products
    Product.bulkCreate([
        { name: 'Laptop', description: 'High performance laptop', price: 1200.5 , stock: 12},
        { name: 'Smartphone', description: 'Latest model smartphone', price: 799.99, stock: 100 },
        { name: 'Headphones', description: 'Noise-cancelling headphones', price: 199.99, stock: 145 },
    ]);
});

// Routes
app.get('/products', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
});

app.get('/', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
});

app.post('/add',  async (req, res) => {
    const { name, description, price, stock } = req.body;
  
    console.log("Adding product")
    try {
      const product = await Product.create({ name, description, price, stock });
      res.status(201).json({ message: 'Product added successfully', product });
    } catch (err) {
      console.log("Error when Adding product")
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Metrics endpoint
  app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  });

  // Middleware pentru masurarea metricilor
  app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      const duration = (Date.now() - start) / 1000;
      requestCounter.inc({ method: req.method, route: req.path, status: res.statusCode });
      responseTimeHistogram.observe({ method: req.method, route: req.path, status: res.statusCode }, duration);
    });
    next();
  });

// Start server
app.listen(PORT, () => console.log(`Product Service running on port ${PORT}`));
