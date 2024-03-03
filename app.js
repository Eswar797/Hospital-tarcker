// app.js

const express = require('express');
const path = require('path');
const doctorRoutes = require('./routes/doctorRoutes');
const patientRoutes = require('./routes/patientRoutes');
const authRoutes = require('./routes/authRoutes');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;
const dbPath = path.join(__dirname, 'db', 'hospital.db');

// Check if the database file exists
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Error opening database: ", err.message);
        return;
    }
    console.log('Connected to the hospital database');
});

// Create doctors and patients tables if they don't exist
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS doctors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        gender TEXT NOT NULL,
        phone TEXT NOT NULL,
        address TEXT NOT NULL,
        email TEXT NOT NULL,
        qualification TEXT NOT NULL,
        specialization TEXT NOT NULL,
        experience INTEGER NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS patients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        gender TEXT NOT NULL,
        age INTEGER NOT NULL,
        phone TEXT NOT NULL,
        address TEXT NOT NULL,
        email TEXT NOT NULL
    )`);

});

const query = `SELECT * FROM patients`;

// Execute the query
db.all(query, [], (err, rows) => {
    if (err) {
        console.error('Error querying database:', err.message);
        return;
    }
    
    // Log the retrieved patients to the console
    console.log('All patients:');
    rows.forEach((patient) => {
        console.log(patient);
    });
});

const query1 = `SELECT * FROM doctors`;

// Execute the query
db.all(query1, [], (err, rows) => {
    if (err) {
        console.error('Error querying database:', err.message);
        return;
    }
    
    // Log the retrieved patients to the console
    console.log('All doctors:');
    rows.forEach((doctor) => {
        console.log(doctor);
    });
});

// Set up views and static files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for parsing JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/doctor', doctorRoutes);
app.use('/patient', patientRoutes);
app.use('/auth', authRoutes);

// Welcome page route
app.get('/', (req, res) => {
    res.render('welcome');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
