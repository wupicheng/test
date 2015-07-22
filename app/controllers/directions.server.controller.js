'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
    Direction = mongoose.model('Direction'),
	_ = require('lodash');

/**
 * Create a article
 */
exports.create = function(req, res) {
	var direction = new Direction(req.body);


    direction.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(direction);
		}
	});
};

/**
 * Show the current direction
 */
exports.read = function(req, res) {
	res.json(req.direction);
};

/**
 * Update a direction
 */
exports.update = function(req, res) {
	var direction = req.direction;

    direction = _.extend(direction, req.body);

    direction.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(direction);
		}
	});
};

/**
 * Delete an direction
 */
exports.delete = function(req, res) {
	var direction = req.direction;

    direction.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(direction);
		}
	});
};

/**
 * List of Direction
 */
exports.list = function(req, res) {
    //Direction.find().sort('-created').populate('user', 'displayName').exec(function(err, directions) {
    //Direction.find().sort('-direction_name').exec(function(err, directions) {
    Direction.find().exec(function(err, directions) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(directions);
		}
	});
};

/**
 * direction middleware
 */
exports.directionByID = function(req, res, next, id) {
	//Direction.findById(id).populate('user', 'displayName').exec(function(err, article) {
	Direction.findById(id).exec(function(err, direction) {
		if (err) return next(err);
		if (!direction) return next(new Error('Failed to load direction ' + id));
		req.direction = direction;
		next();
	});
};

/**
 * Article authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
//	if (req.direction.user.id !== req.user.id) {
//		return res.status(403).send({
//			message: 'User is not authorized'
//		});
//	}
	next();
};