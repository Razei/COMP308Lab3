// The server.js file is the main file of your Node.js application
// It will load the express.js file as a module to bootstrap your Express application
//
// The process.env.NODE_ENV variable is set to the default 'development‘
// value if it doesn't exist.
// Set the 'NODE_ENV' variable
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
// Load the module dependencies
const mongoose = require('./config/mongoose'),
    express = require('./config/express');

// Create a new Mongoose connection instance
const db = mongoose();

// Create a new Express application instance
const app = express();

const Course = require('mongoose').model('Course');
const Student = require('mongoose').model('Student');

Course.count((err, count) => {
    if (count == 0) {
        let courseDocuments = [];
    
        Array(5).fill().forEach((_,i) => {
            courseDocuments.push(new Course({'courseCode': `A${i}`, 'courseName': 'b', 'section': '006', 'semester': '2'}));
        });
    
        Course.create(courseDocuments, (err) => {
            if (err) {
                console.log(err);
            }
        });

        const student1 = new Student({
            'firstName': 'A', 
            'lastName': 'B', 
            'email': 'example@gmail.com', 
            'password': 'password', 
            'courses': [
                courseDocuments[0],
                courseDocuments[1],
                courseDocuments[2],
            ]
        });

        const student2 = new Student({
            'firstName': 'Z', 
            'lastName': 'X', 
            'email': 'example2@gmail.com', 
            'password': 'password', 
            'courses': [
                courseDocuments[3],
                courseDocuments[4],
            ]
        });

        Student.create([student1, student2], (err) => {
            if (err) {
                console.log(err);
            }
        });

    }
});



// Use the Express application instance to listen to the '3000' port
app.listen(3001);

// Use the module.exports property to expose our Express application instance for external usage
module.exports = app; //returns the application object
// Log the server status to the console
console.log('Server running at http://localhost:3001/');