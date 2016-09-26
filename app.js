'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var uaparser = require('ua-parser'); // module for user-agent parser
var accepts = require('accepts'); // module for language header

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.get('/api', function(req, res) {
    var ip = req.header('x-forwarded-for') || req.connection.remoteAddress; // sets ip to var ip
    var os = req.headers['user-agent']; // requests user-agent headers
    os = uaparser.parseOS(os).toString(); // sets os string to var os
    var lang = accepts(req).languages()[0]; // sets language to var lang
    res.json({ ipAddress: ip, language: lang, software: os });
});

app.get('/*', function(req, res) { // wildcard catch-all
    //var path = req.path;    --  not needed
    //res.locals.path = path; --  not needed
    res.render('index');
});

var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
   console.log('Sever listening on port ' + port);
});
