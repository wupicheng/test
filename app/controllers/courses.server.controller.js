'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
    Course = mongoose.model('Course'),
	_ = require('lodash');

/**
 * Create a course
 */
exports.create = function(req, res) {
	var course = new Course(req.body);
    //course.direction = req.direction;

    course.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
            console.log(course);
			res.json(course);
		}
	});
};

/**
 * Show the current course
 */
exports.read = function(req, res) {
	res.json(req.course);
};

/**
 * Update a course
 */
exports.update = function(req, res) {
	var course = req.course;

    course = _.extend(course, req.body);

    course.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(course);
		}
	});
};

/**
 * Delete an course
 */
exports.delete = function(req, res) {
	var course = req.course;

    course.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(course);
		}
	});
};

/**
 * List of Course
 */
exports.list = function(req, res) {
    if(req.query.flag==='q2'){
        console.log(';;;;;;;;;;;;;;;;;;;;;;listssss='+req.query.directionId);
        Course.find({'direction':req.query.directionId}).exec(function(err, courses) {
            //Course.find({'course_name':'JDK'}).exec(function(err, courses) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                res.json(courses);
            }
        });

    }else{
        console.log('list='+req.query.directionId);
        //Course.find().sort('-created').populate('user', 'displayName').exec(function(err, courses) {
        //Course.find().sort('-course_name').exec(function(err, courses) {
        Course.find().populate('direction', 'direction_name').exec(function(err, courses) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                res.json(courses);
            }
        });
    }

};

/**
 * course middleware
 */
exports.courseByID = function(req, res, next, id) {
	Course.findById(id).populate('direction', 'direction_name').exec(function(err, course) {
	//Course.findById(id).exec(function(err, course) {
		if (err) return next(err);
		if (!course) return next(new Error('Failed to load course ' + id));
		req.course = course;
		next();
	});
};

exports.lists=function(req,res){
   // Course.find({'course_name':req.query.userName}).exec(function(err, courses) {
    console.error(';;;;;;;;;;;;;;;;;;;;;listssss='+req.query.directionId);
    //Course.find({'direction':req.query.directionId}).exec(function(err, courses) {
    Course.find({'course_name':'JDK'}).exec(function(err, courses) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(courses);
        }
    });
};






/**
 * Article authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
//	if (req.course.user.id !== req.user.id) {
//		return res.status(403).send({
//			message: 'User is not authorized'
//		});
//	}
	next();
};