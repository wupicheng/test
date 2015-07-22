'use strict';

//Directions service used for communicating with the directions REST endpoints
angular.module('directions').factory('Directions', ['$resource',
	function($resource) {
		return $resource('directions/:directionId', {
			directionId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);