const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route to create a new user
router.post('/register', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.send(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Route to fetch a specific user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) res.send(user);
        else res.status(404).send('User not found');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Route to fetch all users
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.send(users);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;

