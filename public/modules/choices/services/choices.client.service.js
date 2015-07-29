'use strict';

//Choices service used for communicating with the choices REST endpoints
angular.module('choices').factory('Choices', ['$resource',
	function($resource) {
		return $resource('choices/:choiceId', {
			choiceId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
angular.module('choices').factory('Choices2', ['$resource',
    function($resource) {
        return $resource('choices/:directionId'
        );
    }
]);