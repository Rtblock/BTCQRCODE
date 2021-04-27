/*---- Imports ----*/
var express = require('express');
var bodyParser = require('body-parser')
var bitcore = require('bitcore-lib');

//var bch = require('bitcoincashjs');

/*-----------------*/

var app = express();
const PORT = process.env.PORT || 8088

/*------ Middleware ------*/
app.use(bodyParser.json());
/*------------------------*/

/* Routers */

app.get('/BTC', async function(request, response){

    var privatekeyraw=bitcore.PrivateKey('livenet').toWIF();
    var privateKey=bitcore.PrivateKey.fromWIF(privatekeyraw);
    var publicKey = privateKey.toPublicKey();
    var address = privateKey.toAddress();
    console.log("privatekey : " + privateKey);
    console.log("publicKey : " + publicKey);
    console.log("privatekeyraw : " + privatekeyraw);
    var r = {
        "privatekeyraw": privatekeyraw.toString(),
        "publicKey": publicKey.toString(),
        "address": address.toString()
    };
    console.log("Address : " + address.toString());
    console.log("request url : " + request.originalUrl);
    response.redirect("/index.html?address=" + address.toString());
})

app.get('/', function (req, res) {
    res.sendFile( __dirname + "/index.html" );
});

app.get('/index.html', function (req, res) {
    res.sendFile( __dirname + "/index.html" );
});

app.get('/qrcode.js', function (req, res) {
    res.sendFile( __dirname + "/qrcode.js" );
});

app.get('/html5-qrcode.js', function (req, res) {
    res.sendFile( __dirname + "/html5-qrcode.js" );
});

/*---- Server Startup -----*/
app.listen(PORT, function (err, res) {
    if (err != null) {
        console.log("Could not Start Server : " + err.toString())
    } else {
        console.log("Started Server at port : " + PORT);
    }
});
/*------------------------*/
