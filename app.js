'use strict';

var express = require('express')

var app = express();

app.use('/static', express.static(__dirname + '/public'));

app.set('view engine', 'jade');
app.set('views', __dirname + '/templates');

var ip_info;

var get_ip = require('ipware')().get_ip;
app.use(function(req, res, next) {
    ip_info = get_ip(req);
    console.log(ip_info);
    // { clientIp: '127.0.0.1', clientIpRoutable: false }
    next();
});

app.get('/', function(req, res) {
    var path = req.path;
    res.locals.path = path;
    //res.render('index');
    res.json(ip_info);
});

app.listen(process.env.PORT, function() { // change to process.env.PORT when on Heroku
    console.log("request-header-parser-microservice running");
});