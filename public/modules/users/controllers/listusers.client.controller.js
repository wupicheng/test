'use strict';

angular.module('users').controller('ListusersController', ['$scope','$rootScope', '$stateParams', '$location', 'Authentication', 'Users','ngDialog','Groups',
    function($scope,$rootScope, $stateParams, $location, Authentication, Users,ngDialog,Groups) {
        $scope.authentication = Authentication;


        $scope.find = function() {
            $scope.users = Users.query();
            //console.log( $scope.users);
        };

        $scope.findOne = function() {
            console.log('list-user-client-controller...findOne');
            $scope.user = Users.get({
                'userId': $stateParams.userId,'flag':'query_ueser_byid'
            });
        };
        $scope.findOne2 = function() {
            console.log('list-user-client-controller...findOne');
            $scope.user2 = Users.get({
                'userId': $stateParams.userId,'flag':'query_ueser_byid'
            });
        };
//        $scope.findOneByCondition = function() {
//            $scope.user = Users.get({
//                userName: $stateParams.userName
//            });
//           //var url="/users/:"+$stateParams.userName;
//            //$http.get(url).success( function(response) {
//              //  $scope.students = response;
//            });
//        };
        $scope.change=function(){
            // alert($scope.t_userName);
              //console.log($scope.t_userName);
             $scope.users=Users.query({userName:$scope.t_userName});
            // $scope.users=Users.query({username:$scope.t_userName});
            //alert($scope.users.length);
             //$scope.users=Users.get({userName:$stateParams.userName});
        };
        $scope.editGroups = function () {
           // $rootScope.theme = 'ngdialog-theme-plain custom-width';
            $scope.xx='ssss';
            console.log($scope);
            ngDialog.open({
                template: 'modules/users/views/settings/list-user-group-dialog.view.html',
                className: 'ngdialog-theme-default',
                controller:'ListusersController',
                scope:$scope,
                overlay: false

            });
        };
        $scope.removeGroup=function(role){

            for (var i in $scope.user2.roles) {
                if ($scope.user2.roles[i] === role) {
                    $scope.user2.roles.splice(i, 1);
                }
            }
            $scope.update();

        };
        $scope.change_group_type=function(){
          $scope.groups=  Groups.query({'group_type':$scope.group_type,'flag':'query_by_group_type'});

        };

        $scope.addGroup=function(group){
            console.log('sss='+$scope.user2.roles);
          // alert(user2.roles);
            var duplicateflag=false;
            for(var i in $scope.user2.roles){
                if($scope.user2.roles[i] === group){
                    duplicateflag=true;

                }
            }
            if(!duplicateflag){
                $scope.user2.roles.push(group);
                $scope.update();
            }

//            var user = $scope.user2;
//
//            user.$update(function() {
//                $location.path('users/' + user._id);
//            }, function(errorResponse) {
//                $scope.error = errorResponse.data.message;
//            });

        };
        $scope.update = function() {
            var user = $scope.user2;

            user.$update(function() {
                $location.path('users/' + user._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

    }
]);