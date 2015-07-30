'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
    Question = mongoose.model('Question'),
	_ = require('lodash');

/**
 * Create a article
 */
exports.create = function(req, res) {
	var question = new Question(req.body);


    question.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
            console.log(question);
			res.json(question);
		}
	});
};

/**
 * Show the current question
 */
exports.read = function(req, res) {
	res.json(req.question);
};

/**
 * Update a question
 */
exports.update = function(req, res) {
	var question = req.question;

    question = _.extend(question, req.body);

    question.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(question);
		}
	});
};

/**
 * Delete an question
 */
exports.delete = function(req, res) {
	var question = req.question;

    question.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(question);
		}
	});
};

/**
 * List of Question
 */
exports.list = function(req, res) {
    //Question.find().sort('-created').populate('user', 'displayName').exec(function(err, questions) {
    //Question.find().sort('-question_name').exec(function(err, questions) {
    Question.find().populate('point').exec(function(err, questions) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(questions);
		}
	});
};

/**
 * question middleware
 */
exports.questionByID = function(req, res, next, id) {
	//Question.findById(id).populate('user', 'displayName').exec(function(err, article) {
	Question.findById(id).populate('course').exec(function(err, question) {
		if (err) return next(err);
		if (!question) return next(new Error('Failed to load question ' + id));
		req.question = question;
		next();
	});
};

/**
 * Article authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
//	if (req.question.user.id !== req.user.id) {
//		return res.status(403).send({
//			message: 'User is not authorized'
//		});
//	}
	next();
};