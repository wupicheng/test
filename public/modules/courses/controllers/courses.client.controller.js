'use strict';

angular.module('courses').controller('CoursesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Courses','Directions',
	function($scope, $stateParams, $location, Authentication, Courses,Directions) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var course = new Courses({
                course_name: this.course_name,
                course_desc: this.course_desc,
                course_created:Date.now,
               direction : this.direction._id
			});
           // req.direction=this.direction;
			course.$save(function(response) {
				$location.path('courses/' + response._id);

				$scope.course_name = '';
				$scope.course_desc = '';
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
                course.direction=this.direction._id
			course.$update(function() {
				$location.path('courses/' + course._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.courses = Courses.query();
		};
        $scope.initdirection = function() {
            $scope.directions = Directions.query();

        };
        $scope.direction_init = function() {

        };

		$scope.findOne = function() {

			$scope.course = Courses.get({
				courseId: $stateParams.courseId
			},function(data){
                $scope.directions = Directions.query(function(){
                    for(var i in  $scope.directions){

                        if( data.direction._id== $scope.directions[i]._id){

                            $scope.direction=$scope.directions[i];
                        }
                    }

                });

            });

		};
	}
]);