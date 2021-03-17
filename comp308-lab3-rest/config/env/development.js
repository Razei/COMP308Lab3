//Development configuration options
//To sign the session identifier, use a secret string
module.exports = {
    db: 'mongodb://localhost/students',
    //    db: 'mongodb://localhost/customer-store-yourname',

    sessionSecret: 'developmentSessionSecret'
};