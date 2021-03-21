const adminController = require("../controllers/admin.server.controller");

module.exports = (app) => {
    function requireAdminLogin (req, res, next) {
        if ((!req.session.admin && req.url !== '/admin/login')) {
            req.session.error = {type: "admin", message:"This page requires admin login"};
            res.redirect('/admin/login');
        } else {
            next();
        }
    }

    // apply function to all admin routes
    app.all("/admin/*", requireAdminLogin, function(req, res, next) {
        next();
    });

    app.route('/admin/index')
        .get(adminController.getAdminIndex);

    app.route('/admin/login')
        .get(adminController.getAdminLogin)
        .post(adminController.postAdminLogin);

    app.route('/admin/login')
        .get(adminController.getAdminLogin)
        .post(adminController.postAdminLogin);
}