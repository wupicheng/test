'use strict';

angular.module('stus').controller('StusController', ['$scope','$timeout', '$stateParams', '$location', 'Authentication', 'Stus','Upload',
	function($scope, $stateParams, $location, Authentication, Stus,Upload,$timeout) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var stu = new Stus({
				stu_name: this.stu_name,
                stu_idcard: this.stu_idcard
			});

			stu.$save(function(response) {
				$location.path('stus/' + response._id+'/edit');

				$scope.stu_idcard = '';

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(stu) {
			if (stu) {
				stu.$remove();

				for (var i in $scope.stus) {
					if ($scope.stus[i] === stu) {
						$scope.stus.splice(i, 1);
					}
				}
			} else {
				$scope.stu.$remove(function() {
					$location.path('stus');
				});
			}
		};

		$scope.update = function() {
			var stu = $scope.stu;

			stu.$update(function() {
				$location.path('stus/' + stu._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.stus = Stus.query();
		};

		$scope.findOne = function() {
			$scope.stu = Stus.get({
				stuId: $stateParams.stuId
			});
		};

//        $scope.$watch('file', function (file) {
//            if (!file.$error) {
//                $scope.upload($scope.file);
//            }
//        });
//        $scope.upload = function (file) {
//            Upload.upload({
//                url: 'upload/url',
//                fields: {'username': $scope.username},
//                file: file
//            }).progress(function (evt) {
//                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
//                console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
//            }).success(function (data, status, headers, config) {
//                console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
//            }).error(function (data, status, headers, config) {
//                console.log('error status: ' + status);
//            });
//        };

        $scope.uploadFiles = function(file) {
            $scope.f = file;
            if (file && !file.$error) {
                file.upload = Upload.upload({
                    //url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                    url: '/uploads',
                    file: file
                });

                file.upload.then(function (response) {
                    $timeout(function() {
                        file.result = response.data;
                    });
                }, function (response) {
                    if (response.status > 0)
                       // $scope.errorMsg = response.status + ': ' + response.data;
                        $scope.errorMsg = response.status ;
                });

                file.upload.progress(function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                });
            }
        };
	}
]);