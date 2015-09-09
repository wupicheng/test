'use strict';

angular.module('stus').controller('StusController', ['$scope', '$stateParams', '$location', 'Authentication', 'Stus','Upload','$timeout',
	function($scope, $stateParams, $location, Authentication, Stus,Upload,$timeout) {
		$scope.authentication = Authentication;

		$scope.create = function() {
            //var stu_img_path=new String(this.stu_img);


           // var img_path= stu_img_path.substr(stu_img_path.indexOf("\\"));
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
            var stu_img_path=new String($scope.stu.stu_img);
            var img_path= stu_img_path.substr(stu_img_path.indexOf("\\"));
            stu.stu_img=img_path;
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
            $scope.f=$scope.stu.stu_img;
//            var img1= angular.element('#img1');
//           img1[0].src=$scope.stu.stu_img;
            console.log($scope.stu);
            console.log($scope.f);
         //   console.log(img1[0].src);
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
            $scope.d=file;
            if (file && !file.$error) {
                file.upload = Upload.upload({
                    //url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                    url: '/imguploads',
                    file: file
                });

                file.upload.then(function (response) {
                    $timeout(function() {
                        file.result = response.data;
                        var da=response.data;
                        var dapath=da.path;
                        var img_path= dapath.substr(dapath.indexOf("\\"));
                        $scope.f=img_path;
                      $scope.stu.stu_img=img_path;
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