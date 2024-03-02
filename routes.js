// routes.js
const express = require('express');
const bcrypt = require('bcrypt');
const con = require('./db');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', (req, res) => {
  const password = bcrypt.hashSync(req.body.password, 10);
  const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
  con.query(sql, [req.body.email, password], (err, result) => {
    if (err) throw err;
    res.redirect('/');
  });
});

router.post('/login', (req, res) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  con.query(sql, [req.body.email], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      const comparison = bcrypt.compareSync(req.body.password, results[0].password);
      if (comparison) {
        req.session.loggedin = true;
        req.session.email = req.body.email;
        res.redirect('/dashboard');
      } else {
        res.send('Incorrect Password!');
      }
    } else {
      res.send('Incorrect Email!');
    }
  });
});

router.get('/dashboard', (req, res) => {
  if (req.session.loggedin) {
    res.render('dashboard');
  } else {
    res.send('Please login to view this page!');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
