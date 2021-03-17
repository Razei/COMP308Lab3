//express.js file is where we configure our Express application
//
// Load the module dependencies
const config = require('./config'),
    express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    const path = require("path");

// Create a new Express application instance
module.exports = function () {
    //Create the Express application object
    const app = express();

    //the process.env property allows you to access predefined environment variables
    //such as NODE_ENV
    // Use the 'NODE_ENV' variable to activate the 'morgan' logger or 'compress' middleware
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    // Use the 'body-parser' and 'method-override' middleware functions
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    
    app.use(bodyParser.json()); //use middleware that only parses json
    // bootstrap the app using the controller and routing modules
    // Load the routing files
    require('../app/routes/student.server.routes.js')(app);

    return app;
};