import express from "express";
import mysql from "mysql2";
import mongoose from "mongoose";
import 'dotenv/config';

const app = express();

// ============ SQL CONNECTION ============
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PWORD,
    port: '3306',
    database: 'company_db',
});

// MySQL Connection Verification
function verifyMySQLConnection() {
    connection.connect(function(err) {
        if (err) {
            console.error('Error connecting to MySQL: ' + err.stack);
            return;
        }
        console.log('MySQL connected as id ' + connection.threadId);
    });
}

// ============ MONGODB CONNECTION ============
mongoose.connect('mongodb://localhost:27017/companyDB');

const ProjectSchema = new mongoose.Schema({
    name: String,
    budget: Number,
});

const ProjectModel = mongoose.model('Project', ProjectSchema);

// MongoDB Connection Verification
mongoose.connection.on('connected', () => {
    console.log('MongoDB connected successfully');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

// ============ ENDPOINTS ============
// Middleware to parse JSON request bodies
app.use(express.json());

// ------ MONGODB ENDPOINTS ------
app.get('/projects', async (req, res) => {
    const projects = await ProjectModel.find({});
    return res.status(200).json(projects);
});

app.post('/projects', async (req, res) => {
    const user = { name: req.body.name, budget: req.body.budget };
    await ProjectModel.create(user);
    return res.status(201).json(user);
});

app.delete('/projects/:id', async (req, res) => {
    const user = await ProjectModel.findByIdAndDelete(req.params.id);
    return res.status(200).json(user);
});

// ------ MYSQL ENDPOINTS ------
// IMPORTANT: Use ? placeholders for user input instead of string concatenation!
// Example: connection.query('SELECT * FROM users WHERE id = ?', [userId], callback)
// This prevents SQL injection attacks where malicious users could insert
// harmful SQL code through input fields and damage your database.
app.get('/employees', function (req, res) {
    const table = connection.query(
        "SELECT * FROM employees;", 
        function (err, rows) {
            if (err) return res.status(500).json({ error: err.message });
            return res.status(200).json(rows);
    });
});

app.post('/employees', function (req, res) {
    const user = connection.query(
        "INSERT INTO employees (name, position, salary) VALUES (?, ?, ?)", 
        [req.body.name, req.body.position, req.body.salary],
        function (err, result) {
            if (err) return res.status(500).json({ error: err.message });
            return res.status(201).json(result.insertId);
        });
});


app.delete('/employees/:id', function (req, res) {
    const user = connection.query(
        "DELETE FROM employees WHERE id = ?", 
        [req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            return res.status(204)
        }
    );
});

// ============ START SERVER ============
app.listen(3000, function () {
    console.log('Server is running on http://localhost:3000');
    verifyMySQLConnection();
});