
var studentController = require('../../app/controllers/student.server.controller');

module.exports = function (app) {
    // Set up the 'userId' parameter middleware
    //All param callbacks will be called before any handler of 
    //any route in which the param occurs, and they will each 
    //be called only once in a request - response cycle, 
    //even if the parameter is matched in multiple routes
    app.param('id', studentController.userByID);
    app.post('/signin', studentController.authenticate);
    app.get('/read_cookie', studentController.isSignedIn);

    app.get("/students", studentController.getAllStudents);
    app.get("/studentsCourses", studentController.getAllStudentsAndCourses);
   
    app.get("/students/:id", studentController.getAllStudentsByCourse);
    app.post("/student/:id/courses", studentController.updateStudentCourses);
    app.post("/student", studentController.createStudent);
    app.put("/student/:id", studentController.updateStudent);
    app.delete("/student/:id", studentController.deleteStudent);
    app.post("/signup", studentController.createStudent);
    app.post('/signout', studentController.signout);

    app.route('/getStudent/:id')
    .get(studentController.read)
 

    

}