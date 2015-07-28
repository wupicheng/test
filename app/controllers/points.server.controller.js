'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
    Point = mongoose.model('Point'),
	_ = require('lodash');

/**
 * Create a article
 */
exports.create = function(req, res) {
	var point = new Point(req.body);


    point.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
            console.log(point);
			res.json(point);
		}
	});
};

/**
 * Show the current point
 */
exports.read = function(req, res) {
	res.json(req.point);
};

/**
 * Update a point
 */
exports.update = function(req, res) {
	var point = req.point;

    point = _.extend(point, req.body);

    point.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(point);
		}
	});
};

/**
 * Delete an point
 */
exports.delete = function(req, res) {
	var point = req.point;

    point.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(point);
		}
	});
};

/**
 * List of Point
 */
exports.list = function(req, res) {
    //Point.find().sort('-created').populate('user', 'displayName').exec(function(err, points) {
    //Point.find().sort('-point_name').exec(function(err, points) {
    Point.find().exec(function(err, points) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(points);
		}
	});
};

/**
 * point middleware
 */
exports.pointByID = function(req, res, next, id) {
	//Point.findById(id).populate('user', 'displayName').exec(function(err, article) {
	Point.findById(id).populate('course', 'course_name').exec(function(err, point) {
		if (err) return next(err);
		if (!point) return next(new Error('Failed to load point ' + id));
		req.point = point;
		next();
	});
};

/**
 * Article authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
//	if (req.point.user.id !== req.user.id) {
//		return res.status(403).send({
//			message: 'User is not authorized'
//		});
//	}
	next();
};