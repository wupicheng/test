'use strict';

angular.module('groups').controller('GroupsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Groups',
	function($scope, $stateParams, $location, Authentication, Groups) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var group = new Groups({
				group_name: this.group_name,
				group_desc: this.group_desc,
                group_type: $scope.group_type
			});
            console.log(group);
            //console.log($scope);
			group.$save(function(response) {
				$location.path('groups/' + response._id);

				$scope.group_name = '';
				$scope.group_desc = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(group) {
			if (group) {
				group.$remove();

				for (var i in $scope.groups) {
					if ($scope.groups[i] === group) {
						$scope.groups.splice(i, 1);
					}
				}
			} else {
				$scope.group.$remove(function() {
					$location.path('groups');
				});
			}
		};

		$scope.update = function() {
			var group = $scope.group;

			group.$update(function() {
				$location.path('groups/' + group._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.groups = Groups.query();
		};

		$scope.findOne = function() {
			$scope.group = Groups.get({
				groupId: $stateParams.groupId
			});
		};
        $scope.change_group_type=function(){
            $scope.groups=Groups.query({'group_type':$scope.group_type,'flag':'query_by_group_type'});

        };
	}
]);