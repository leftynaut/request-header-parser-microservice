'use strict';

var express = require('express');

var uaparser = require('ua-parser'); // module for user-agent parser
var accepts = require('accepts'); // module for language header

var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/templates');

app.get('/api', function(req, res) {
    var ip = req.header('x-forwarded-for') || req.connection.remoteAddress; // sets ip to var ip
    var os = req.headers['user-agent']; // requests user-agent headers
    os = p.parseOS(userAgent).toString(); // sets os string to var os
    var lang = accepts(req).languages()[0]; // sets language to var lang
    res.json({ ipAddress: ip, language: lang, software: os });
});

app.get('/*', function(req, res) { // wildcard catch-all
    //var path = req.path;    --  not needed
    //res.locals.path = path; --  not needed
    res.render('index');
});

app.listen(process.env.PORT, function() { // change to process.env.PORT when on Heroku
    console.log("request-header-parser-microservice running");
});