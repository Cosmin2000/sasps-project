const express = require('express');
const User = require('./models/User');

const app = express();
app.use(express.json());

// Register a new user
app.post('/register', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Get user by ID
app.get('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (user) {
        res.send(user);
    } else {
        res.status(404).send({ error: 'User not found' });
    }
});

const PORT = 5001;
app.listen(PORT, () => console.log(`User Service running on port ${PORT}`));

