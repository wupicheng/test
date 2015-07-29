'use strict';

angular.module('choices').controller('ChoicesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Choices','Directions',
	function($scope, $stateParams, $location, Authentication, Choices,Directions) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var choice = new Choices({
                choice_name: this.choice_name,
                choice_desc: this.choice_desc,
                choice_created:Date.now,
               direction : this.direction._id
			});
           // req.direction=this.direction;
			choice.$save(function(response) {
				$location.path('choices/' + response._id);

				$scope.choice_name = '';
				$scope.choice_desc = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(choice) {
			if (choice) {
				choice.$remove();

				for (var i in $scope.choices) {
					if ($scope.choices[i] === choice) {
						$scope.choices.splice(i, 1);
					}
				}
			} else {
				$scope.choice.$remove(function() {
					$location.path('choices');
				});
			}
		};

		$scope.update = function() {
			var choice = $scope.choice;
                choice.direction=this.direction._id;
			choice.$update(function() {
				$location.path('choices/' + choice._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.choices = Choices.query();
		};
        $scope.initdirection = function() {
            $scope.directions = Directions.query();

        };
        $scope.direction_init = function() {

        };

		$scope.findOne = function() {

			$scope.choice = Choices.get({
				choiceId: $stateParams.choiceId
			},function(data){
                $scope.directions = Directions.query(function(){
                    for(var i in  $scope.directions){

                        if( data.direction._id=== $scope.directions[i]._id){

                            $scope.direction=$scope.directions[i];
                        }
                    }

                });

            });

		};
	}
]);