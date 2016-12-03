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
var urldecode = bodyParser.urlencoded({extended:false});

//app.set('view engine', 'ejs');

//var data = require('./shared-data');
var redis = require('redis');
var client = redis.createClient();

client.select((process.env.NODE_ENV || "development").length);

client.hset('cities', 'Faustia',    'More dishonor quickly');
client.hset('cities', 'Lotopia',    'For bears');
client.hset('cities', 'Caspiana',   'The other place');
//client.hset('cities', 'Indigo',     'Out tha do');

app.use(express.static('public'));


app.get("/", function(request, response){
//    console.log("GET /");
   response.send("ok") ;
});

app.get("/cities", function(request, response){
//    console.log("GET /cities");
    client.hkeys('cities', function(error, names){
        if(error){
            throw error;
        }
        response.json(names);
    });
});
app.get("/cities/:name", function(request, response){
    var name = request.params.name;
    console.log("Received get request for /cities/:name", name);

    client.hget('cities', name,
    function(error, description){
        if(error){
            throw error;
        }
        response.render("show.ejs", {
            city: {
                name: name
                ,description: description
            }
        });
//        response.send("<p>" + description + "<p>");
    });
});

app.post("/cities"
, urldecode
, function(request, response){
//    console.log("POST /cities");
    var cityData = request.body;
    if (!cityData.name || !cityData.description) {
        response.sendStatus(400);
        return false;
    }
    client.hset('cities', cityData.name, cityData.description
        , function(error){
            if(error){
                throw error;
            }
        });

//    data.cities[cityData.name] = cityData.description;
    response.status(201).json(cityData.name);
});

app.delete("/cities/:name", function(request, response){
    var name = request.params.name;
    console.log("Received delete request for /cities/" + name);
    client.hdel('cities', name, function(error){
        if(error){
            throw error;
        }
        response.sendStatus(204);
    });
});


//required for testability
module.exports = app;

//moved into bin/www
//bin/www made executable with chmod +x
//to run server run ./bin/www from the project root (here)
//app.listen(3000, function(){
//    console.log("BuildingExpressJsWithTDD running on port 3000");
//});