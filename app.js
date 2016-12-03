/***********************
 *	Project		: BuildExpressJsWithTDD
 *	Author		: Todd Mullen
 *	Document	: app.js
 *	Created		: Dec 2, 2016, 11:17:59 AM
 *	Description	:
 *      Controls Express application server.
 *      Deployed application to @link https://obscure-mesa-80716.herokuapp.com/
 ***********************/

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var data = require('./shared-data');

app.use(express.static('public'));
var urldecode = bodyParser.urlencoded({extended:false});

app.get("/", function(request, response){
   response.send("ok") ;
});

app.get("/cities", function(request, response){
    console.log("Received get request for /cities");

    response.json(data.cities);
});

app.post("/cities"
, urldecode
, function(request, response){
    console.log("Received post request for /cities");
    var cityData = request.body;
    data.cities[cityData.name] = cityData.description;
    response.status(201).json(cityData.name);
});


//required for testability
module.exports = app;

//moved into bin/www
//bin/www made executable with chmod +x
//to run server run ./bin/www from the project root (here)
//app.listen(3000, function(){
//    console.log("BuildingExpressJsWithTDD running on port 3000");
//});