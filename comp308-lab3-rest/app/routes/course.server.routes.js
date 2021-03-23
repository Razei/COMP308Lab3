var courseController = require('../../app/controllers/course.server.controller');

module.exports = function (app) {
    // Set up the 'userId' parameter middleware
    //All param callbacks will be called before any handler of 
    //any route in which the param occurs, and they will each 
    //be called only once in a request - response cycle, 
    //even if the parameter is matched in multiple routes
    // app.param('userId', studentController.userByID);
    // app.post('/signin', studentController.authenticate);
    
    app.route("/courses").get(courseController.getAllCourses);
    app.post("/course", courseController.createCourse);
    app.route("/course/:id")
    .put(courseController.updateCourse)
    .delete(courseController.dropCourse);
}