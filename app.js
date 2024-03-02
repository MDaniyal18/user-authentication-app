// server.js
const express = require('express');
const session = require('express-session');
const routes = require('./routes');

const app = express();
app.set('view engine', 'ejs');

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.use('/', routes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
