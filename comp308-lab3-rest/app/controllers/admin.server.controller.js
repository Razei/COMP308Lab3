const mongoose = require('mongoose');
const Student = mongoose.model('Student');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const jwtExpirySeconds = 300;
const jwtKey = config.secretKey;

const StudentModel = require('mongoose').model('Student');
const AdminModel = require('mongoose').model('Admin');

// constant index data for admin
const indexData = [
    {
        icon: "bi bi-people-fill",
        link: "/admin/students",
        linkText: "Display All Students"
    },
    {
        icon: "bi bi-chat-left-text-fill",
        link: "/admin/comments",
        linkText: "Display Comments by Student"
    },
];

module.exports = {
    getAdminIndex: (req, res) => {
        
    },

    getAdminLogin: (req, res) => {
        if (req.session.error) {
            res.render('adminSignIn', {
                title: 'Sign In',
                error: req.session.error
            });

            delete req.session.error; // remove from further requests
            req.session.save(); // update the session
        } else {
            res.render('adminSignIn', {
                title: 'Admin - Sign In'
            });
        }
    },

    deleteStudent: (req, res) => {
        console.log(req.body);

        StudentModel.findOneAndRemove({
            _id: req.body.studentID.toString()
        }, (err) => {
            if (err) throw err;
        });

        res.redirect('/admin/students');
    },


    postAdminLogin: (req, res, next) => {
        const email = req.body.email;

        AdminModel.findOne({
            email: email //finding a document by username
        }, (err, admin) => {
            if (err) {
                // Call the next middleware with an error message
                return next(err);
            } else {
                // if admin user found
                if (admin && req.body.password === admin.password) {
                    // Do not store the password in the session
                    delete admin.password;

                    //parse it to a JSON object
                    req.session.admin = JSON.parse(JSON.stringify(admin));
                    res.redirect('/admin/index');
                } else {
                    // console.log("Not found");
                    // return to login page with error message
                    req.session.error = {type: "incorrect", message:"Incorrect username or password."};
                    res.redirect('/admin/login');
                }
            }
        });
    },
}