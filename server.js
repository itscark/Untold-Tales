// Require express and create an instance of it
const express = require('express');
const app = express();
const path = require('path');

const hostname = 'localhost';
const port = 5000;

// save static files like images, scripts and css in `public`...
app.use(express.static(__dirname + '/public'));

// return the qrcode view
app.get('/qrcode/:char?', function (req, res) {
    res.status(200).sendFile(path.join(__dirname + '/public/views/qrcode.html'));
});

//return arjs view
app.get('/arjs/:char?', function (req, res) {
    res.status(200).sendFile(path.join(__dirname + '/public/views/arjs.html'));
});

// Change the 404 message modifing the middleware
app.use(function(req, res, next) {
    res.status(404).sendFile(path.join(__dirname + '/public/views/404.html'));
});

// start the server in the port 3000 !
app.listen(port, hostname , function () {
    console.log(`Server running at http://${hostname}:${port}/`);
});