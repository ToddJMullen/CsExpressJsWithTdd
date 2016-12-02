/***********************
 *	Project		: BuildExpressJsWithTDD
 *	Author		: Todd Mullen
 *	Document	: app.js
 *	Created		: Dec 2, 2016, 11:17:59 AM
 *	Description	:
 *      Controls Express application server.
 ***********************/

var express = require('express');
var app = express();

app.get("/", function(request, response){
   response.send("ok") ;
});



app.listen(3000, function(){
    console.log("BuildingExpressJsWithTDD running on port 3000");
});