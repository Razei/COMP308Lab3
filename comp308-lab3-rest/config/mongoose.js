// Load the module dependencies:
//  config.js module and mongoose module
const config = require('./config'),
    mongoose = require('mongoose');

// Define the Mongoose configuration method
module.exports = function () {
    // Use Mongoose to connect to MongoDB
    const db = mongoose.connect(config.db, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    }).then(() => console.log('DB Connected!'))
        .catch(err => {
            console.log('Error', err);
        });
    
    require('../app/models/student.server.model');
    require('../app/models/course.server.model');
    
    // Return the Mongoose connection instance
    return db;
};