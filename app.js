'use strict';

var express = require('express');

var ip = require('ip');

var os = require('os'); // built-in module for getting system info
var osName = require('os-name'); // module for addtl system info

var accepts = require('accepts'); // module for language header

var app = express();

app.use('/static', express.static(__dirname + '/public'));

app.set('view engine', 'jade');
app.set('views', __dirname + '/templates');

ip = ip.address(); // sets ip to ip variable

osName = osName(); // sets os name to os variable

app.get('/', function(req, res) {
    var path = req.path;
    res.locals.path = path;
    //res.render('index');
    accepts = accepts(req).languages()[0]; // sets language to accepts variable
    res.json({ ipaddress: ip, language: accepts, software: osName });
});

app.listen(3000, function() { // change to process.env.PORT when on Heroku
    console.log("request-header-parser-microservice running");
});