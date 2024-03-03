// routes/authRoutes.js

const express = require('express');
const router = express.Router();

// Login Page
router.get('/login', (req, res) => {
    res.render('login');
});

// Authentication (dummy example)
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Dummy authentication logic (replace with actual authentication)
    if (username === 'admin' && password === 'admin') {
        res.send('Login successful');
    } else {
        res.status(401).send('Invalid username or password');
    }
});

module.exports = router;
