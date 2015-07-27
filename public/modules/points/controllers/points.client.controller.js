'use strict';

angular.module('points').controller('PointsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Points',
	function($scope, $stateParams, $location, Authentication, Points) {
		$scope.authentication = Authentication;

		$scope.create = function() {
           // alert(this.point_name);
			var point = new Points({
                point_name: this.point_name,
                point_desc: this.point_desc
                //point_created:this.point_created
			});
			point.$save(function(response) {
				$location.path('points/' + response._id);

				$scope.point_name = '';
				$scope.point_name = '';
				$scope.point_created = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(point) {
			if (point) {
				point.$remove();

				for (var i in $scope.points) {
					if ($scope.points[i] === point) {
						$scope.points.splice(i, 1);
					}
				}
			} else {
				$scope.point.$remove(function() {
					$location.path('points');
				});
			}
		};

		$scope.update = function() {
			var point = $scope.point;

			point.$update(function() {
				$location.path('points/' + point._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.points = Points.query();
		};

		$scope.findOne = function() {
			$scope.point = Points.get({
				pointId: $stateParams.pointId
			});
		};
	}
]);