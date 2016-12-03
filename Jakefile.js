/***********************
 *	Project		: BuildExpressJsWithTDD
 *	Author		: Todd Mullen
 *	Document	: build.js
 *	Created		: Dec 3, 2016, 10:23:08 AM
 *	Description	:
 *      Controls
 ***********************/

(function(){
    "use strict";
    var pkgJson = require("./package");
    var NODE_VERSION = "v" + pkgJson.engines.node;

    desc( "Default build" );
    task( "default", ["version"], function(){
        console.log( "Default task..." );



        console.log( "\n\nIIFE Complete" );
    } );

    desc("Check the node version...");
    task("version", function(){
        console.log( "Checking Node Version: ", process.version );
        if (process.version !== NODE_VERSION) {
            fail("Incorrect Node version.\n\t Required " + NODE_VERSION + ", but found " + process.version);
        }
    });


}());//iife




