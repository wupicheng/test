'use strict';

angular.module('exams').controller('ExamsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Exams','Groups',
	function($scope, $stateParams, $location, Authentication, Exams,Groups) {
		$scope.authentication = Authentication;
        $scope.showSelectGroup=false;
		$scope.create = function() {
			var exam = new Exams({
				exam_name: this.exam_name,
                exam_password: this.exam_password
			});

			exam.$save(function(response) {
				$location.path('exams/' + response._id);

				$scope.exam_name = '';
				$scope.exam_password = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(exam) {
			if (exam) {
				exam.$remove();

				for (var i in $scope.exams) {
					if ($scope.exams[i] === exam) {
						$scope.exams.splice(i, 1);
					}
				}
			} else {
				$scope.exam.$remove(function() {
					$location.path('exams');
				});
			}
		};

		$scope.update = function() {
			var exam = $scope.exam;

			exam.$update(function() {
				$location.path('exams/' + exam._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.exams = Exams.query();
		};

		$scope.findOne = function() {
			$scope.exam = Exams.get({
				examId: $stateParams.examId
			});
		};

        $scope.change_group_type=function(){


        };
//        $scope.editGroups = function () {
//            // $rootScope.theme = 'ngdialog-theme-plain custom-width';
//            $scope.xx="ssss";
//            console.log($scope);
//            ngDialog.open({
//                template: 'modules/users/views/settings/list-user-group-dialog.view.html',
//                className: 'ngdialog-theme-default',
//                controller:'ListusersController',
//                scope:$scope,
//                overlay: false
//
//            });
//        };
        $scope.editGroups=function(){
          $scope.showSelectGroup=true;

        };
        $scope.hideSelectGroup=function(){
            $scope.showSelectGroup=false;

        };

        $scope.addGroup=function(group){

            $scope.exam.exam_group.push(group);
            $scope.update();
            $scope.showSelectGroup=false;
        };
        $scope.change_group_type=function(){
            $scope.groups=  Groups.query({'group_type':$scope.group_type,'flag':'query_by_group_type'});

        };
        $scope.saveExamTime=function(){
            //alert("saveExamTime");
          //  $scope.exam.exam_time=$scope.
               $scope.update();

        };

	}
]);