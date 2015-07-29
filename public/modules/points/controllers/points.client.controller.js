'use strict';

angular.module('points').controller('PointsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Points','Directions','Courses','Courses2',
	function($scope, $stateParams, $location, Authentication, Points,Directions,Courses,Courses2) {
		$scope.authentication = Authentication;

		$scope.create = function() {
           // alert(this.point_name);
			var point = new Points({
                point_name: this.point_name,
                point_desc: this.point_desc,
                point_created:Date.now,
                course : this.course._id
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
        $scope.findOneEdit = function() {
            $scope.directions = Directions.query();
            $scope.point = Points.get({
                pointId: $stateParams.pointId
            },function(){
                $scope.courses = Courses.query({directionId:$scope.point.course.direction,flag:'q2'},function(){
                    for(var i in  $scope.courses){

                        if( $scope.point.course._id=== $scope.courses[i]._id){

                            $scope.course=$scope.courses[i];
                        }
                    }
                });


                $scope.directions = Directions.query(function(){
                    //alert( 'from points client controller...$scope.point.course.direction='+JSON.stringify($scope.point.course));
                    for(var i in  $scope.directions){

                        if( $scope.point.course.direction=== $scope.directions[i]._id){

                            $scope.direction=$scope.directions[i];
                        }
                    }

                });

            });
        };
        $scope.change=function(){
            //alert('sss');
            $scope.courses=Courses.query({directionId:$scope.direction._id,flag:'q2'});
            //$scope.courses=Courses2.query({directionId:$scope.direction._id,flag:'q2'});

        };

        $scope.initdirection = function() {
            $scope.directions = Directions.query();

        };

	}
]);