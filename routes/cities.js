/***********************
 *	Project		: BuildExpressJsWithTDD
 *	Author		: Todd Mullen
 *	Document	: cities.js
 *	Created		: Dec 3, 2016, 3:11:45 PM
 *	Description	:
 *      Controls all the city resource routing
 ***********************/

var express     = require('express');
var router      = express.Router();
var bodyParser = require('body-parser');
var urldecode = bodyParser.urlencoded({extended:false});

//var data = require('./shared-data');
var redis = require('redis');
var client = redis.createClient();

client.select((process.env.NODE_ENV || "development").length);

client.hset('cities', 'Faustia',    'More dishonor quickly');
client.hset('cities', 'Lotopia',    'For bears');
client.hset('cities', 'Caspiana',   'The other place');
client.hset('cities', 'Indeygo',     'Out dey go');


router.route('/')
.get(function(request, response){
//    console.log("GET /cities");
    client.hkeys('cities', function(error, names){
        if(error){
            throw error;
        }
        response.json(names);
    });
})
.post( urldecode
, function(request, response)
{
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
})
;

router.route("/:name")
.get( function(request, response)
{
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
})


.delete(
    function(request, response)
    {
    var name = request.params.name;
    console.log("Received delete request for /cities/" + name);
    client.hdel('cities', name, function(error){
        if(error){
            throw error;
        }
        response.sendStatus(204);
    });
});



module.exports = router;



