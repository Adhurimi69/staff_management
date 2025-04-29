// config/db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',       // or '127.0.0.1'
  user: 'root',            // default phpMyAdmin username
  password: '',            // your MySQL root password, often empty on local setups
  database: 'staff_db'
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Error connecting to the database:', err.message);
  } else {
    console.log('✅ Connected to the MySQL database.');
  }
});

module.exports = connection;
