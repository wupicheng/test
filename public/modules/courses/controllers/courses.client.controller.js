'use strict';

angular.module('courses').controller('CoursesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Courses',
	function($scope, $stateParams, $location, Authentication, Courses) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var course = new Courses({
				title: this.title,
				content: this.content
			});
			course.$save(function(response) {
				$location.path('courses/' + response._id);

				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(course) {
			if (course) {
				course.$remove();

				for (var i in $scope.courses) {
					if ($scope.courses[i] === course) {
						$scope.courses.splice(i, 1);
					}
				}
			} else {
				$scope.course.$remove(function() {
					$location.path('courses');
				});
			}
		};

		$scope.update = function() {
			var course = $scope.course;

			course.$update(function() {
				$location.path('courses/' + course._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.courses = Courses.query();
		};

		$scope.findOne = function() {
			$scope.course = Courses.get({
				courseId: $stateParams.courseId
			});
		};
	}
]);