'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	points = require('../../app/controllers/points.server.controller');

module.exports = function(app) {
	// Article Routes
	app.route('/points')
		.get(points.list)
		.post(users.requiresLogin, points.create);

	app.route('/points/:pointId')
		.get(points.read)
		.put(users.requiresLogin, points.hasAuthorization, points.update)
		.delete(users.requiresLogin, points.hasAuthorization, points.delete);

	// Finish by binding the point middleware
	app.param('pointId', points.pointByID);
};