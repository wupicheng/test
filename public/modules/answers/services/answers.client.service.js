'use strict';

//Answers service used for communicating with the answers REST endpoints
angular.module('answers').factory('Answers', ['$resource',
	function($resource) {
		return $resource('answers/:answerId', {
			answerId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);