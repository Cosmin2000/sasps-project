const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const axios = require('axios');
const cors = require('cors');


const app = express();
const PORT = 4000;
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:4200', // Adresa frontend-ului
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Metode permise
    allowedHeaders: ['Content-Type', 'Authorization'], // Header-ele permise
  }));
// Proxy middleware
// app.use('/auth', createProxyMiddleware({ target: 'http://auth-service:4001', changeOrigin: true }));
// app.use('/products', createProxyMiddleware({ target: 'http://product-service:4002', changeOrigin: true }));
// app.use('/cart', createProxyMiddleware({ target: 'http://cart-service:4003', changeOrigin: true }));

app.post('/auth/register', async (req, res) => {
    try {
        const response = await axios.post('http://auth-service:4001/register', req.body);
        res.send(response.data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error registering user');
    }
});

app.post('/auth/login', async (req, res) => {
    try {
        const response = await axios.post('http://auth-service:4001/login', req.body);
        res.send(response.data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error registering user');
    }
});
// Start server
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
