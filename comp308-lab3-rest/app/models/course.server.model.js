// using the ref to reference another document
//
// Load the Mongoose module and Schema object
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a new 'CourseSchema'
const CourseSchema = new Schema({
    courseCode: String,
    courseName: String,
    section: String,
    semester: String,
});

// Create the 'Course' model out of the 'StudentSchema'
mongoose.model("Course", CourseSchema);
