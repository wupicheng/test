'use strict';

angular.module('directions').controller('DirectionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Directions',
	function($scope, $stateParams, $location, Authentication, Directions) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var direction = new Directions({
				title: this.title,
				content: this.content
			});
			direction.$save(function(response) {
				$location.path('directions/' + response._id);

				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(direction) {
			if (direction) {
				direction.$remove();

				for (var i in $scope.directions) {
					if ($scope.directions[i] === direction) {
						$scope.directions.splice(i, 1);
					}
				}
			} else {
				$scope.direction.$remove(function() {
					$location.path('directions');
				});
			}
		};

		$scope.update = function() {
			var direction = $scope.direction;

			direction.$update(function() {
				$location.path('directions/' + direction._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.directions = Directions.query();
		};

		$scope.findOne = function() {
			$scope.direction = Directions.get({
				directionId: $stateParams.directionId
			});
		};
	}
]);