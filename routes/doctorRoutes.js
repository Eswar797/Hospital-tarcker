// routes/doctorRoutes.js

const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '..', 'db', 'hospital.db');
const db = new sqlite3.Database(dbPath);

// Doctor Registration


// GET request for doctor registration form
router.get('/register', (req, res) => {
    res.render('doctorRegister');
});

// POST request for doctor registration form submission

router.post('/register', (req, res) => {
    const { name, gender, phone, address, email, qualification, specialization, experience } = req.body;

    const sql = `INSERT INTO doctors (name, gender, phone, address, email, qualification, specialization, experience) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    db.run(sql, [name, gender, phone, address, email, qualification, specialization, experience], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error registering doctor' });
        }
        res.status(201).json({ message: 'Doctor registered successfully' });
    });
});

module.exports = router;
