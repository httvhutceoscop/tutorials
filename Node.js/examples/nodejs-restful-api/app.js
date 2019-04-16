var express = require('express');
var app     = express();
var db      = require('./config/db');
var AuthController = require('./classes/controller/auth/AuthController');
app.use('/api/auth', AuthController);

var UserController = require('./classes/controller/UserController');
app.use('/users', UserController);

module.exports = app;