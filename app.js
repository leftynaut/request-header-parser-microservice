const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const uaparser = require('ua-parser'); // module for user-agent parser
const accepts = require('accepts'); // module for language header

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.get('/', (req, res) => {
    const host = req.get('host');
    res.render('index', {
        host
    });
});

app.get('/*', (req, res) => { // wildcard catch-all
    const ipAddress = req.header('x-forwarded-for') || req.connection.remoteAddress;
    let software = req.headers['user-agent']; // requests user-agent headers
    software = uaparser.parseOS(software).toString(); // sets software string to var software
    const language = accepts(req).languages()[0]; // sets language to var language
    res.json({
        ipAddress,
        language,
        software
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
