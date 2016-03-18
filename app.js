'use strict';

var express = require('express');

var ip = require('ip'); // module for getting ip address
var http = require('http');
var p = require('ua-parser');
var accepts = require('accepts'); // module for language header

var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/templates');

ip = ip.address(); // sets ip address to ip var

app.get('/api', function(req, res) {
    var userAgent = req.headers['user-agent'];
    userAgent = p.parseOS(userAgent).toString();
    var lang = accepts(req).languages()[0]; // sets language to lang var
    res.json({ ipaddress: ip, language: lang, software: userAgent });
});

app.get('/*', function(req, res) { // wildcard catch-all
    //var path = req.path;
    //res.locals.path = path;
    res.render('index');
});

app.listen(process.env.PORT, function() { // change to process.env.PORT when on Heroku
    console.log("request-header-parser-microservice running");
});