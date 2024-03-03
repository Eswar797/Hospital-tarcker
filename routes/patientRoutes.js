// routes/patientRoutes.js

const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '..', 'db', 'hospital.db');
const db = new sqlite3.Database(dbPath);

// Patient Registration
router.get('/register', (req, res) => {
    res.render('patientRegister');
});

router.post('/register', (req, res) => {
    const { name, gender, age, phone, address, email } = req.body;

    const sql = `INSERT INTO patients (name, gender, age, phone, address, email) 
                 VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(sql, [name, gender, age, phone, address, email], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error registering patient' });
        }
        res.status(201).json({ message: 'Patient registered successfully' });
    });
});

module.exports = router;
