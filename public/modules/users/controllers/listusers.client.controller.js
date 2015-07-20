'use strict';

angular.module('users').controller('ListusersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Users',
    function($scope, $stateParams, $location, Authentication, Users) {
        $scope.authentication = Authentication;


        $scope.find = function() {
            $scope.users = Users.query();
            console.log( $scope.users);
        };

        $scope.findOne = function() {
            $scope.user = Users.get({
                userId: $stateParams.userId
            });
        };
        $scope.findOneByCondition = function() {
            $scope.user = Users.get({
                userName: $stateParams.userName
            });
           var url="/users/:"+$stateParams.userName;
            $http.get(url).success( function(response) {
                $scope.students = response;
            });
        };
        $scope.change=function(){
             $scope.users=Users.get({userName:$stateParams.userName});
        };

    }
]);