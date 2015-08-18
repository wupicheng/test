'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    mongoose = require('mongoose'),
    errorHandler = require('../errors.server.controller'),
    User = mongoose.model('User');

/**
 * List of Exam
 */
exports.list = function (req, res) {
    //Exam.find().sort('-created').populate('user', 'displayName').exec(function(err, exams) {
    //Exam.find().sort('-exam_name').exec(function(err, exams) {
    //User.find({'username':req.params.userName}).exec(function(err, users) {
    //console.log(req.query.userName);
    console.log('list-user-server-controller...' + req.query.userId);
    if (req.query.flag === 'query_ueser_byid') {

        User.findById(req.query.userId).exec(function (err, user) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {

                res.json(user);
                //console.log('userbyid2...'+user);

            }
        });
    } else {
        User.find({'username': req.query.userName}).exec(function (err, users) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                res.json(users);
            }
        });
    }

};
exports.list2 = function (req, res) {

    User.find().exec(function (err, users) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.header('Access-Control-Allow-Origin', '*');
            res.json(users);

        }
    });
};

exports.update = function(req, res) {
    var user = req.user;

    user = _.extend(user, req.body);

    user.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(user);
        }
    });
};

exports.createx = function (req, res) {
    console.log('listusers controller create x...');
    var user = new User(req.body);

    console.log(user);
    user.save(function (err) {
        res.header('Access-Control-Allow-Origin', '*');
        return  res.json(user);
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {

            res.json(user);
        }
    });
};
exports.userByName = function (req, res, next, userName) {
    //Exam.find().sort('-created').populate('user', 'displayName').exec(function(err, exams) {
    //Exam.find().sort('-exam_name').exec(function(err, exams) {
    User.find({'username': userName}).exec(function (err, user) {
        if (err) return next(err);
        if (!user) return next(new Error('Failed to load user ' + userName));
        req.user1 = user;
        next();
    });
};

exports.userByID2 = function (req, res) {

    console.log('userbyid2...');
    User.findById(req.query.userId).exec(function (err, user) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {

            res.json(user);
            console.log('userbyid2...' + user);

        }
    });
};
/**
 * exam middleware
 */
exports.userByID = function (req, res, next, id) {
    //Exam.findById(id).populate('user', 'displayName').exec(function(err, article) {
    //alert(id);
    console.log(id);
    User.findById(id).exec(function (err, user) {
        if (err) return next(err);
        if (!user) return next(new Error('Failed to load user ' + id));
        req.user = user;
        next();
    });
};

/**
 * Article authorization middleware
 */
exports.hasAuthorization = function (req, res, next) {
//	if (req.exam.user.id !== req.user.id) {
//		return res.status(403).send({
//			message: 'User is not authorized'
//		});
//	}
    next();
};