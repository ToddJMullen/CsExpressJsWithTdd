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

describe( "Make request to the root path", function(){
    it( 'return 200 status code', function(done){
        request( app )
            .get( '/' )
            .expect( 200 )
            .end( function(error){
                if(error){throw error;}
                done();
            } );
    } );
} );




