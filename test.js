/***********************
 *	Project		: BuildExpressJsWithTDD
 *	Author		: Todd Mullen
 *	Document	: test.js
 *	Created		: Dec 2, 2016, 11:41:51 AM
 *	Description	:
 *      Stages and runs the application tests.
 *      To execute tests cd into same dir and run node test.js
 ***********************/

var request = require( 'supertest' );
var app = require( './app' );
//var data = require('./shared-data');
var redis = require('redis');
var client = redis.createClient();
client.select('test'.length);
var data;
//client.flushdb();

describe( "Making a request to the root", function(){
    it( 'Returns 200 status code', function(done){
        request( app )
            .get( '/' )
            .expect( 200 )
            .end( function(error){
                if(error){throw error;}
                done();
            } );
    } );

    it('Returns HTML', function(done){
        request(app)
            .get('/')
            .expect('Content-Type', /html/)
            .end( function(error){
                if(error){throw error;}
            done();
        } );
    });

    it('Returns an index file with the "Add City" form', function(done){
        request(app)
            .get('/')
            .expect(/formAddCity/gi, done);
    });

} );



describe('List cities on the /cities route', function(){

    it('Return 200 status code', function(done){
        request(app)
        .get('/cities')
        .expect(200, done);
    });

    before(function(){

        client.hkeys('cities', function(error, names){
            if(error){
                throw error;
            }
            console.log("Setting expected data: ", names);
            data = names;
        });
    });

    it('Returns expected cities array as JSON', function(done){
        request(app)
            .get('/cities')
            .expect( 'Content-Type', /json/ )
            .expect( data )
            .end( function(error){
                if(error){throw error;}
                    done();
                }
            );
    });
});



describe('Creating new cities', function(){

    it('POST /cities returns 201 status', function(done){
        request(app)
            .post('/cities')
            .send('name=TestCity&description=this+is+the+test')
            .expect(201, done);
    });

    it('Returns the city name sent', function(done){
        request(app)
            .post('/cities')
            .send('name=TestCity&description=this+is+the+test')
            .expect(/TestCity/, done);
    });

    it('Validates city name & description', function(done){
        request(app)
            .post('/cities')
            .send('name=&description=')
            .expect(400, done);
    });

});

describe('Deleting cities', function(){

    before(function(){
        client.hset('cities', 'DeleteMe',   'I shouldn\'t be here!');
    });

    it('Returns 204 status', function(done){
        request(app)
            .delete('/cities/DeleteMe')
            .expect(204, done);
    });
});





