const mongoose = require('mongoose');
const Student = mongoose.model('Student');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const jwtExpirySeconds = 300;
const jwtKey = config.secretKey;

module.exports = {
    authenticate: (req, res, next) => {
        // Get credentials from request
        console.log(req.body)
        const username = req.body.auth.email;
        const password  = req.body.auth.password;
    
        //find the user with given username using static method findOne
        Student.findOne({email: username}, (err, student) => {
                if (err) {
                    return next(err);
                } else {
                console.log(student)
    
                if (student){
                    //compare passwords	
                    if(bcrypt.compareSync(password, student.password)) {
                        // Create a new token with the user id in the payload
                        // and which expires 300 seconds after issue
                        const token = jwt.sign({ id: student._id, username: student.email }, jwtKey, 
                            {algorithm: 'HS256', expiresIn: jwtExpirySeconds });
                        console.log('token:', token)
                        // set the cookie as the token string, with a similar max age as the token
                        // here, the max age is in milliseconds
                        res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000,httpOnly: true});
                        res.status(200).send({ screen: student.email });
                        //
                        //res.json({status:"success", message: "user found!!!", data:{user:
                        //user, token:token}});
        
                        req.user=student;
                        //call the next middleware
                        next()
                    } else {
                        res.status(400).send({ msg: 'Invalid username/password'});
                    }
                } else {
                    res.status(400).send({ msg: 'Invalid username/password'});
                }
            }
        });
    },

    // 'userByID' controller method to find a user by its id
    userByID: (req, res, next, id) => {
        // Use the 'User' static 'findOne' method to retrieve a specific user
        Student.findOne({
            _id: id
        }, (err, user) => {
            if (err) {
                // Call the next middleware with an error message
                return next(err);
            } else {
                // Set the 'req.user' property
                req.user = user;
                console.log(user);
                // Call the next middleware
                next();
            }
        });
    },

    //
    //sign out function in controller
    //deletes the token on the client side by clearing the cookie named 'token'
    signout: (req, res) => {
        res.clearCookie("token")
        return res.status('200').json({message: "signed out"})
        // Redirect the user back to the main application page
        //res.redirect('/');
    },

    //check if the user is signed in
    isSignedIn: (req, res) => {
        // Obtain the session token from the requests cookies,
        // which come with every request
        const token = req.cookies.token
        console.log(token)
        // if the cookie is not set, return 'auth'
        if (!token) {
        return res.send({ screen: 'auth' }).end();
        }
        var payload;
        try {
        // Parse the JWT string and store the result in `payload`.
        // Note that we are passing the key in this method as well. This method will throw an error
        // if the token is invalid (if it has expired according to the expiry time we set on sign in),
        // or if the signature does not match
        payload = jwt.verify(token, jwtKey)
        } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            // the JWT is unauthorized, return a 401 error
            return res.status(401).end()
        }
        // otherwise, return a bad request error
        return res.status(400).end()
        }
    
        // Finally, token is ok, return the username given in the token
        res.status(200).send({ screen: payload.username });
    },

    //isAuthenticated() method to check whether a user is currently authenticated
    requiresLogin: (req, res, next) => {
        // Obtain the session token from the requests cookies,
        // which come with every request
        const token = req.cookies.token
        console.log(token)
        // if the cookie is not set, return an unauthorized error
        if (!token) {
        return res.send({ screen: 'auth' }).end();
        }
        var payload;
        try {
        // Parse the JWT string and store the result in `payload`.
        // Note that we are passing the key in this method as well. This method will throw an error
        // if the token is invalid (if it has expired according to the expiry time we set on sign in),
        // or if the signature does not match
        payload = jwt.verify(token, jwtKey)
        console.log('in requiresLogin - payload:',payload)
        req.id = payload.id;
        } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            // if the error thrown is because the JWT is unauthorized, return a 401 error
            return res.status(401).end()
        }
        // otherwise, return a bad request error
        return res.status(400).end()
        }
        // user is authenticated
        //call next function in line
        next();
    },

    getAllStudents: (_req, res, next) => {
        // Use the 'Student' instance's 'find' method to retrieve a new user document
        Student.find({}, function (err, users) {
            if (err) {
                return next(err);
            } else {
                res.json(users);
            }
        });
    },

    createStudent: (req, res, next) => {
        // Create a new instance of the 'Student' Mongoose model
        const studentDocument = new Student(req.body); //get data from ejs page and attaches them to the model
        console.log("body: " + req.body);

        // find student by email
        Student.findOne({
            email: req.body.email
        }, (err, student) => {
            if (err) {
                // Call the next middleware with an error message
                return next(err);
            } else {
                // if student exists
                if (student) {
                    res.status(400).send({ msg: 'Student already exists'});
                    // req.session.error = {type: "exists", message: "Student already exists"};
                } else {
                    // Use the 'Student' instance's 'save' method to save a new user document
                    studentDocument.save((err, savedStudent) => {
                        if (err) {
                            // Call the next middleware with an error message
                            return next(err);
                        } else {
                            // Use the 'response' object to send a JSON response
                            res.json(savedStudent);
                        }
                    });
                }
            }
        });
    },

    updateStudent: (req, res, next) => {
        const studentDocument = new Student(req.body); //get data from ejs page and attaches them to the model
        const filter = {_id: req.params.id};
        console.log("body: " + req.body);

        Student.findOneAndUpdate(filter, studentDocument, {upsert: true}, (err) => {
            if (err) {
                // Call the next middleware with an error message
                return next(err);
            } else {
                // Use the 'response' object to send a JSON response
                res.json(studentDocument);
            }
        }); 
    },

    deleteStudent: (req, res, next) => {
        const id = req.params.id;

        Student.findByIdAndRemove(id, (err, deletedStudent) => {
            if (err) {
                return next(err);
            } else {
                res.json(deletedStudent);
            }
        });
    },

    getAllStudentsByCourse: function (req, res, next) {
        Student.find({}, (err) => {
            if (err) {
                return next(err);
            }
        }).populate({
            path: 'courses',
            match: {
                _id: req.params.id
            }
        }).then((students) => {
            const filteredStudents = students.filter(student => student.courses.length != 0);
            res.json(filteredStudents);
        });
    },
}