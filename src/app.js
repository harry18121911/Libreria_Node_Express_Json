const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
//setting
app.set('port',5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

//routes
app.use(require('./routes/index.js'));

//static
app.use(express.static(path.join(__dirname, 'public')));

//404
app.use((req ,res ,next) => {
    res.status(404).send('404 Not Found');
});

module.exports = app;