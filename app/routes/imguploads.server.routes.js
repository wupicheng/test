'use strict';

/**
 * Module dependencies.
 */

var  imguploads = require('../../app/controllers/imguploads.server.controller.js');

module.exports = function(app) {
	// Article Routes
	app.route('/imguploads')
		.get(imguploads.create)
		.post(imguploads.create)
		.put(imguploads.create);


};