// db.js
const mysql = require('mysql2');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database'
});

con.connect(function(err) {
  if (err) throw err;
  console.log('Connected to the database!');
});

module.exports = con;
