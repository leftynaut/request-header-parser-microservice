'use strict';

var express = require('express');
//var os = require('os');
var accepts = require('accepts'); // module for language header

var app = express();

app.use('/static', express.static(__dirname + '/public'));

app.set('view engine', 'jade');
app.set('views', __dirname + '/templates');

var ip_info;

var get_ip = require('ipware')().get_ip;
app.use(function(req, res, next) {
    ip_info = get_ip(req);
    ip_info = ip_info.clientIp;
    // console.log(ip_info);
    // { clientIp: '127.0.0.1', clientIpRoutable: false }
    next();
});

//var ip = os.networkInterfaces().lo0[1].address;

app.get('/', function(req, res) {
    var path = req.path;
    res.locals.path = path;
    var lang = accepts(req).languages()[0];
    //res.render('index');
    res.json({ ipaddress: ip_info, language: lang, software: null });
});

app.listen(process.env.PORT, function() { // change to process.env.PORT when on Heroku
    console.log("request-header-parser-microservice running");
});