const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.get('/products', async (req, res) => {
    try {
        // Use the service name instead of localhost
        const response = await axios.get('http://product-service:5002/');
        res.send(response.data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error fetching products');
    }
});

app.post('/users/register', async (req, res) => {
    try {
        const response = await axios.post('http://user-service:5001/register', req.body);
        res.send(response.data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error registering user');
    }
});

app.get('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const response = await axios.get(`http://user-service:5001/${userId}`);
        res.send(response.data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error fetching user');
    }
});

app.post('/orders/create', async (req, res) => {
    try {
        const response = await axios.post('http://order-service:5003/create', req.body);
        res.send(response.data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error creating order');
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
