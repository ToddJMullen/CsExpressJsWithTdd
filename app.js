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

//app.set('view engine', 'ejs');

app.use(express.static('public'));


app.get("/", function(request, response){
   response.send("ok") ;
});

var cities = require('./routes/cities');
app.use('/cities', cities);

//required for testability
module.exports = app;

//moved into bin/www
//bin/www made executable with chmod +x
//to run server run ./bin/www from the project root (here)
//app.listen(3000, function(){
//    console.log("BuildingExpressJsWithTDD running on port 3000");
//});