/**
 * Created by wupic on 2015/8/27.
 */
'use strict';
var uploads = require('../../app/controllers/uploads.server.controller');

module.exports = function(app) {
    // Article Routes
    app.route('/uploads')
        .post(uploads.create);

//    app.route('/uploads/:stuId')
//        .get(stus.read)
//        .put(users.requiresLogin, stus.hasAuthorization, stus.update)
//        .delete(users.requiresLogin, stus.hasAuthorization, stus.delete);

    // Finish by binding the stu middleware
   // app.param('stuId', stus.stuByID);
};