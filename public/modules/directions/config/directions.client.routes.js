'use strict';

// Setting up route
angular.module('directions').config(['$stateProvider',
	function($stateProvider) {
		// Directions state routing
		$stateProvider.
		state('listDirections', {
			url: '/directions',
			templateUrl: 'modules/directions/views/list-directions.client.view.html'
		}).
		state('createDirection', {
			url: '/directions/create',
			templateUrl: 'modules/directions/views/create-direction.client.view.html'
		}).
		state('viewDirection', {
			url: '/directions/:directionId',
			templateUrl: 'modules/directions/views/view-direction.client.view.html'
		}).
		state('editDirection', {
			url: '/directions/:directionId/edit',
			templateUrl: 'modules/directions/views/edit-direction.client.view.html'
		});
	}
]);