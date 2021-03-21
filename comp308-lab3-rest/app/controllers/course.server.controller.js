const Course = require('mongoose').model('Course');

module.exports = {
    createCourse: (req, res, next) => {
        const courseDocument = new Course(req.body);

        courseDocument.save((err) => {
            if (err) {
                return next(err);
            } else {
                res.json(courseDocument);
            }
        });
    },
    
    updateCourse: (req, res, next) => {
        const courseDocument = new Course(req.body);
        const filter = {"_id": req.params.id};
        console.log("body: " + req.body);

        Course.findOneAndUpdate(filter, courseDocument, {upsert: true}, (err) => {
            if (err) {
                // Call the next middleware with an error message
                return next(err);
            } else {
                // Use the 'response' object to send a JSON response
                res.json(courseDocument);
            }
        }); 
    },
    
    dropCourse: (req, res, next) => {
        const id = req.params.id;

        Course.findByIdAndRemove(id, (err, deletedCourse) => {
            if (err) {
                return next(err);
            } else {
                if (deletedCourse){
                    res.json(deletedCourse);
                } else {
                    res.send("Does not exist or already deleted.");
                }
            }
        });
    },
    
    getAllCourses: (_req, res, next) => {
        Course.find((err, courses) => {
            if (err) {
                return next(err);
            } else {
                res.json(courses);
            }
        })
    },
}
