'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
    Answer = mongoose.model('Answer'),
	_ = require('lodash');

/**
 * Create a article
 */
exports.create = function(req, res) {
	var answer = new Answer(req.body);


    answer.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(answer);
		}
	});
};

/**
 * Show the current answer
 */
exports.read = function(req, res) {
    console.log('answer....read method');
	res.json(req.answer);
};

/**
 * Update a answer
 */
exports.update = function(req, res,next) {
	var answer = req.answer;

    answer = _.extend(answer, req.body);

    answer.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
            Answer.findById(answer._id).populate('answer_questions').exec(function(err, answer2) {
                if (err) return next(err);
                if (!answer2) return next(new Error('Failed to load answer ' + answer._id));

                res.json(answer2);
            });

		}
	});
};

/**
 * Delete an answer
 */
exports.delete = function(req, res) {
	var answer = req.answer;

    answer.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(answer);
		}
	});
};

/**
 * List of Answer
 */
exports.list = function(req, res) {
    //Answer.find().sort('-created').populate('user', 'displayName').exec(function(err, answers) {
    //Answer.find().sort('-answer_name').exec(function(err, answers) {
    Answer.find().exec(function(err, answers) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(answers);
		}
	});
};

/**
 * answer middleware
 */
exports.answerByID = function(req, res, next, id) {
	//Answer.findById(id).populate('user', 'displayName').exec(function(err, article) {
	Answer.findById(id).populate('answer_questions').exec(function(err, answer) {
		if (err) return next(err);
		if (!answer) return next(new Error('Failed to load answer ' + id));
		req.answer = answer;
		next();
	});
};

/**
 * Article authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
//	if (req.answer.user.id !== req.user.id) {
//		return res.status(403).send({
//			message: 'User is not authorized'
//		});
//	}
	next();
};