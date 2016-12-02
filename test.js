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
var data = require('./shared-data');

describe( "Make request to the root", function(){
    it( 'Return 200 status code', function(done){
        request( app )
            .get( '/' )
            .expect( 200 )
            .end( function(error){
                if(error){throw error;}
                done();
            } );
    } );

//    it('Returns JSON', function(done){
//        request(app)
//            .get('/cities')
//            .expect('Content-Type', /json/i)
//            .end( function(error){
//                if(error){throw error;}
//                done();
//            } );
//    });
//
    it('Returns initial cities array', function(done){
        request(app)
            .get('/cities')
            .expect( JSON.stringify(data.cities) )
            .end( function(error){
                if(error){throw error;}
            done();
        } );
    });

//    it('Returns a HTML', function(done){
//        request(app)
//            .get('/')
//            .expect('Content-Type', /html/)
//            .end( function(error){
//                if(error){throw error;}
//            done();
//        } );
//    });

//    it('Returns an index file with the cities', function(done){
//        request(app)
//            .get('/')
//            .expect(/cities/i, done);
//    });

} );


describe('List cities on the /cities route', function(){

    it('Return 200 status code', function(done){
        request(app)
        .get('/cities')
        .expect(200, done);
    });
});








