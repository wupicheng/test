'use strict';

//Directions service used for communicating with the points REST endpoints
angular.module('points').factory('Points', ['$resource',
	function($resource) {
		return $resource('points/:pointId', {
			pointId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
