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

describe( "Make request to the root\n", function(){
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

    it('Returns a HTML', function(done){
        request(app)
            .get('/')
            .expect('Content-Type', /html/)
            .end( function(error){
                if(error){throw error;}
            done();
        } );
    });

//    it('Returns an index file with the cities', function(done){
//        request(app)
//            .get('/')
//            .expect(/(.*)*cities(.*)*/gi, done);
//    });

} );


describe('List cities on the /cities route\n', function(){

    it('Return 200 status code', function(done){
        request(app)
        .get('/cities')
        .expect(200, done);
    });

    it('Returns initial cities array as JSON', function(done){
        request(app)
            .get('/cities')
            .expect( 'Content-Type', /json/ )
            .expect( data.cities )
            .end( function(error){
                if(error){throw error;}
            done();
        } );
    });
});

describe('Creating new cities\n', function(){

    it('POST to /cities returns 201 status', function(done){
        request(app)
            .post('/cities')
            .send('name=TestCity&description=this+is+the+test')
            .expect(201, done);
    });

    it('Should return the city name sent', function(done){
        request(app)
            .post('/cities')
            .send('name=TestCity&description=this+is+the+test')
            .expect(/TestCity/, done);
    });
});







