const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3001;

app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employees'
});

// Connect to MySQL
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// CRUD Routes

// Create employee
app.post('/employees', (req, res) => {
    const { emp_id, first_name, last_name, dept } = req.body;
    const sql = 'INSERT INTO employees (emp_id, first_name, last_name, dept) VALUES (?, ?, ?, ?)';
    db.query(sql, [emp_id, first_name, last_name, dept], (err, result) => {
        if (err) throw err;
        res.send('Employee added successfully');
    });
});

// Read employees
app.get('/employees', (req, res) => {
    const sql = 'SELECT * FROM employees';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Update employee
app.put('/employees/:id', (req, res) => {
    const id = req.params.id;
    const { first_name, last_name, dept } = req.body;
    const sql = 'UPDATE employees SET first_name = ?, last_name = ?, dept = ? WHERE emp_id = ?';
    db.query(sql, [first_name, last_name, dept, id], (err, result) => {
        if (err) throw err;
        res.send('Employee updated successfully');
    });
});

// Delete employee
app.delete('/employees/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM employees WHERE emp_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send('Employee deleted successfully');
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

