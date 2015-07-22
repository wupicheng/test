'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	directions = require('../../app/controllers/directions.server.controller');

module.exports = function(app) {
	// Article Routes
	app.route('/directions')
		.get(directions.list)
		.post(users.requiresLogin, directions.create);

	app.route('/directions/:directionId')
		.get(directions.read)
		.put(users.requiresLogin, directions.hasAuthorization, directions.update)
		.delete(users.requiresLogin, directions.hasAuthorization, directions.delete);

	// Finish by binding the direction middleware
	app.param('directionId', directions.directionByID);
};