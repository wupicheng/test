'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	answers = require('../../app/controllers/answers.server.controller');

module.exports = function(app) {
	// Teacher Routes
	app.route('/answers')
		.get(answers.list)
		.post(users.requiresLogin, answers.create);

	app.route('/answers/:answerId')
		.get(answers.read)
		.put(users.requiresLogin, answers.hasAuthorization, answers.update)
		.delete(users.requiresLogin, answers.hasAuthorization, answers.delete);

	// Finish by binding the answer middleware
	app.param('answerId', answers.answerByID);
};