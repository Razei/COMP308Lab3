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

        courseDocuments.push(new Course({'courseCode': `COMP311`, 'courseName': 'Software Testing and Quality Assurance (003)', 'section': '003', 'semester': '3'}));
        courseDocuments.push(new Course({'courseCode': `COMP303`, 'courseName': 'Java EE Programming (001)', 'section': '001', 'semester': '4'}));
        courseDocuments.push(new Course({'courseCode': `COMP303`, 'courseName': 'Java EE Programming (002)', 'section': '002', 'semester': '4'}));
        courseDocuments.push(new Course({'courseCode': `COMP303`, 'courseName': 'Java EE Programming (003)', 'section': '003', 'semester': '4'}));
        courseDocuments.push(new Course({'courseCode': `COMP303`, 'courseName': 'Java EE Programming (004)', 'section': '004', 'semester': '4'}));
        courseDocuments.push(new Course({'courseCode': `GNED100`, 'courseName': 'General Course (001)', 'section': '001', 'semester': '5'}));
        courseDocuments.push(new Course({'courseCode': `GNED100`, 'courseName': 'General Course (002)', 'section': '002', 'semester': '5'}));
        courseDocuments.push(new Course({'courseCode': `COMP308`, 'courseName': 'Emerging Technologies (005)', 'section': '005', 'semester': '5'}));
        courseDocuments.push(new Course({'courseCode': `COMP308`, 'courseName': 'Emerging Technologies (006)', 'section': '006', 'semester': '5'}));
        courseDocuments.push(new Course({'courseCode': `COMP123`, 'courseName': 'Programming 2 (001)', 'section': '001', 'semester': '2'}));
    
        Course.create(courseDocuments, (err) => {
            if (err) {
                console.log(err);
            }
        });

        const student1 = new Student({
            'firstName': 'Bob', 
            'lastName': 'Barker', 
            'email': 'bbarker@gmail.com', 
            'password': 'password', 
            'courses': [
                courseDocuments[0],
                courseDocuments[1],
                courseDocuments[6],
            ]
        });

        const student2 = new Student({
            'firstName': 'John', 
            'lastName': 'Henry', 
            'email': 'jhenry@gmail.com', 
            'password': 'password', 
            'courses': [
                courseDocuments[7],
                courseDocuments[8],
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